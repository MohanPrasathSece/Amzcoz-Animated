export function initHeroShader(canvasId = 'hero-shader') {
  // Note: mobile is now supported. The shader applies mobile optimizations
  // internally: DPR clamped to 0.55 (~80% fewer fragment evaluations) and
  // render throttled to ~30-35fps to prevent CPU/GPU throttling on phones.

  const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
  if (!canvas) return;

  const gl =
    (canvas.getContext('webgl', { alpha: true, antialias: true }) as WebGLRenderingContext) ||
    (canvas.getContext('experimental-webgl', { alpha: true, antialias: true }) as WebGLRenderingContext);

  if (!gl) return;

  const vsSource = `
    attribute vec2 position;
    varying vec2 vUv;
    void main() {
      vUv = position * 0.5 + 0.5;
      gl_Position = vec4(position, 0.0, 1.0);
    }
  `;

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const precision = isMobile ? 'mediump' : 'highp';

  const fsSource = `
    precision ${precision} float;
    varying vec2 vUv;
    uniform float uTime;
    uniform vec2 uResolution;
    uniform vec2 uMouse;

    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy));
      vec2 x0 = v - i + dot(i, C.xx);
      vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod289(i);
      vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m;
      m = m*m;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
      vec3 g;
      g.x  = a0.x * x0.x + h.x * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    float fbm(vec2 p) {
      float total = 0.0;
      float amp = 0.5;
      for (int i = 0; i < 4; i++) {
        total += amp * snoise(p);
        p *= 2.02;
        amp *= 0.5;
      }
      return total;
    }

    void main() {
      vec2 st = gl_FragCoord.xy / uResolution.xy;
      float aspect = uResolution.x / uResolution.y;
      st.x *= aspect;
      vec2 mouse = uMouse / uResolution.xy;
      mouse.x *= aspect;

      float d = distance(st, mouse);
      float mousePush = smoothstep(0.7, 0.0, d) * 0.75;
      float t = uTime * 0.12;

      vec2 p = st * 1.3 - vec2(0.5 * aspect, 0.4);
      p.x += p.y * 0.35;

      vec2 q = vec2(
        fbm(p + vec2(t * 0.3, t * 0.2) + mousePush),
        fbm(p + vec2(t * -0.2, t * 0.4) - mousePush)
      );

      vec2 r = vec2(
        fbm(p + 1.2 * q + vec2(1.7, 9.2) + 0.15 * t),
        fbm(p + 1.2 * q + vec2(8.3, 2.8) + 0.12 * t)
      );

      float f = fbm(p + 1.5 * r + mousePush * 0.3);

      vec3 colorInk       = vec3(0.02, 0.02, 0.025);
      vec3 colorDeepBlue  = vec3(0.0, 0.20, 0.70);
      vec3 colorElectric  = vec3(0.0, 0.40, 0.95);
      vec3 colorCyanGlow  = vec3(0.35, 0.60, 1.0);
      vec3 colorHighlight = vec3(0.50, 0.75, 1.0);

      float wave = smoothstep(-0.3, 0.9, f + q.x * 0.5);
      float peak = smoothstep(0.2, 0.95, r.y + f * 0.6);
      float silk = smoothstep(0.4, 0.98, length(r) * 0.8 + mousePush * 0.5);

      vec3 color = mix(colorInk, colorDeepBlue, wave * 0.85);
      color = mix(color, colorElectric, peak * 0.9);
      color = mix(color, colorCyanGlow, silk * 0.85);
      color += colorHighlight * (smoothstep(0.7, 1.0, silk) * 0.4);

      float noise = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
      color += (noise - 0.5) * 0.03;

      gl_FragColor = vec4(color, 1.0);
    }
  `;

  function createShader(gl: WebGLRenderingContext, type: number, source: string) {
    const s = gl.createShader(type);
    if (!s) return null;
    gl.shaderSource(s, source);
    gl.compileShader(s);
    return s;
  }

  const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
  const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);

  if (!vs || !fs) return;

  const program = gl.createProgram();
  if (!program) return;

  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);

  const posBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
    gl.STATIC_DRAW,
  );

  const posLocation = gl.getAttribLocation(program, 'position');
  const uTimeLoc = gl.getUniformLocation(program, 'uTime');
  const uResLoc = gl.getUniformLocation(program, 'uResolution');
  const uMouseLoc = gl.getUniformLocation(program, 'uMouse');

  let mouseX = window.innerWidth * 0.5;
  let mouseY = window.innerHeight * 0.5;
  let targetMouseX = mouseX;
  let targetMouseY = mouseY;
  let isVisible = true;
  let isRunning = false;
  let animId: number | null = null;

  window.addEventListener(
    'mousemove',
    (e) => {
      targetMouseX = e.clientX;
      targetMouseY = window.innerHeight - e.clientY;
    },
    { passive: true },
  );

  // Touch support so the shader reacts to finger tap/drag on mobile
  const onTouchMove = (e: TouchEvent) => {
    if (e.touches.length > 0) {
      targetMouseX = e.touches[0].clientX;
      targetMouseY = window.innerHeight - e.touches[0].clientY;
    }
  };
  const onTouchStart = (e: TouchEvent) => {
    if (e.touches.length > 0) {
      targetMouseX = e.touches[0].clientX;
      targetMouseY = window.innerHeight - e.touches[0].clientY;
    }
  };
  window.addEventListener('touchmove', onTouchMove, { passive: true });
  window.addEventListener('touchstart', onTouchStart, { passive: true });

  function resize() {
    const parent = canvas.parentElement;
    const width = parent ? parent.clientWidth : window.innerWidth;
    const height = parent ? parent.clientHeight : window.innerHeight;
    const isMobile = window.innerWidth < 768;
    // On mobile screens, clamp DPR to 0.55 so GPU fragment evaluations drop by ~80%
    const dpr = isMobile ? 0.55 : Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);
  }

  window.addEventListener('resize', resize, { passive: true });
  resize();

  const startTime = performance.now();
  let lastRenderTime = 0;
  const isMobileDevice = typeof window !== 'undefined' && window.innerWidth < 768;

  function render() {
    if (!isVisible) {
      isRunning = false;
      return;
    }

    const now = performance.now();
    // On mobile, throttle shader computation to ~30-35fps to completely prevent CPU/GPU throttling
    if (isMobileDevice && now - lastRenderTime < 28) {
      animId = requestAnimationFrame(render);
      return;
    }
    lastRenderTime = now;

    const time = (now - startTime) * 0.001;
    mouseX += (targetMouseX - mouseX) * 0.06;
    mouseY += (targetMouseY - mouseY) * 0.06;

    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.enableVertexAttribArray(posLocation);
    gl.vertexAttribPointer(posLocation, 2, gl.FLOAT, false, 0, 0);
    gl.uniform1f(uTimeLoc, time);
    gl.uniform2f(uResLoc, canvas.width, canvas.height);
    gl.uniform2f(
      uMouseLoc,
      (mouseX * canvas.width) / window.innerWidth,
      (mouseY * canvas.height) / window.innerHeight,
    );

    gl.drawArrays(gl.TRIANGLES, 0, 6);
    animId = requestAnimationFrame(render);
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible && !isRunning) {
        isRunning = true;
        animId = requestAnimationFrame(render);
      }
    },
    { threshold: 0.05 },
  );

  observer.observe(canvas.parentElement || canvas);
}
