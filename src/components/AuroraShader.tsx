import { useEffect, useRef } from 'react'

const VERTEX = `
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`

const FRAGMENT = `
  precision highp float;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  varying vec2 vUv;

  vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}
  vec4 mod289(vec4 x){return x-floor(x*(1./289.))*289.;}
  vec4 permute(vec4 x){return mod289(((x*34.)+1.)*x);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-.85373472095314*r;}

  float snoise(vec3 v){
    const vec2 C=vec2(1./6.,1./3.);
    const vec4 D=vec4(0.,.5,1.,2.);
    vec3 i=floor(v+dot(v,C.yyy));
    vec3 x0=v-i+dot(i,C.xxx);
    vec3 g=step(x0.yzx,x0.xyz);
    vec3 l=1.-g;
    vec3 i1=min(g.xyz,l.zxy);
    vec3 i2=max(g.xyz,l.zxy);
    vec3 x1=x0-i1+C.xxx;
    vec3 x2=x0-i2+C.yyy;
    vec3 x3=x0-D.yyy;
    i=mod289(i);
    vec4 p=permute(permute(permute(
      i.z+vec4(0.,i1.z,i2.z,1.))
      +i.y+vec4(0.,i1.y,i2.y,1.))
      +i.x+vec4(0.,i1.x,i2.x,1.));
    float n_=.142857142857;
    vec3 ns=n_*D.wyz-D.xzx;
    vec4 j=p-49.*floor(p*ns.z*ns.z);
    vec4 x_=floor(j*ns.z);
    vec4 y_=floor(j-7.*x_);
    vec4 x=x_*ns.x+ns.yyyy;
    vec4 y=y_*ns.x+ns.yyyy;
    vec4 h=1.-abs(x)-abs(y);
    vec4 b0=vec4(x.xy,y.xy);
    vec4 b1=vec4(x.zw,y.zw);
    vec4 s0=floor(b0)*2.+1.;
    vec4 s1=floor(b1)*2.+1.;
    vec4 sh=-step(h,vec4(0.));
    vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
    vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
    vec3 p0=vec3(a0.xy,h.x);
    vec3 p1=vec3(a0.zw,h.y);
    vec3 p2=vec3(a1.xy,h.z);
    vec3 p3=vec3(a1.zw,h.w);
    vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
    p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
    vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);
    m=m*m;
    return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
  }

  void main(){
    vec2 uv=vUv;
    float aspect=uResolution.x/uResolution.y;
    vec2 p=(uv-.5)*vec2(aspect,1.);

    vec2 mouse=(uMouse-.5)*vec2(aspect,1.);
    float mouseDist=length(p-mouse);
    float mouseInf=smoothstep(.8,0.,mouseDist)*.3;

    float t=uTime*.15;
    float n1=snoise(vec3(p*1.5+mouseInf,t));
    float n2=snoise(vec3(p*3.-mouseInf,t*1.3+10.));
    float n3=snoise(vec3(p*5.,t*.8+20.));
    float noise=n1*.5+n2*.3+n3*.2;

    vec3 black=vec3(0.);
    vec3 cyan=vec3(0.,.83,1.);
    vec3 deepCyan=vec3(0.,.4,.55);
    vec3 purple=vec3(.25,.05,.5);
    vec3 hotWhite=vec3(.85,.95,1.);

    vec3 col=black;
    col=mix(col,deepCyan*.3,smoothstep(-.2,.3,noise));
    col=mix(col,cyan*.5,smoothstep(.1,.6,noise));
    col=mix(col,purple*.4,smoothstep(.2,.7,n2));
    col=mix(col,hotWhite*.3,smoothstep(.5,.9,noise));

    float glow=exp(-mouseDist*mouseDist*8.)*.15;
    col+=cyan*glow;

    float vignette=1.-smoothstep(.3,1.2,length(p));
    col*=vignette;
    col*=.45;

    gl_FragColor=vec4(col,1.);
  }
`

export default function AuroraShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl', { antialias: false, alpha: false })
    if (!gl) return

    // Compile shaders
    function compile(type: number, src: string) {
      const s = gl!.createShader(type)!
      gl!.shaderSource(s, src)
      gl!.compileShader(s)
      return s
    }

    const vs = compile(gl.VERTEX_SHADER, VERTEX)
    const fs = compile(gl.FRAGMENT_SHADER, FRAGMENT)
    const prog = gl.createProgram()!
    gl.attachShader(prog, vs)
    gl.attachShader(prog, fs)
    gl.linkProgram(prog)
    gl.useProgram(prog)

    // Full-screen quad
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW)
    const pos = gl.getAttribLocation(prog, 'position')
    gl.enableVertexAttribArray(pos)
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0)

    // Uniforms
    const uTime = gl.getUniformLocation(prog, 'uTime')
    const uMouse = gl.getUniformLocation(prog, 'uMouse')
    const uRes = gl.getUniformLocation(prog, 'uResolution')

    let mouse = { x: 0.5, y: 0.5 }
    let smoothMouse = { x: 0.5, y: 0.5 }
    let raf = 0
    const startTime = performance.now()

    function resize() {
      const dpr = Math.min(devicePixelRatio, 1.5)
      const w = canvas!.clientWidth
      const h = canvas!.clientHeight
      canvas!.width = w * dpr
      canvas!.height = h * dpr
      gl!.viewport(0, 0, canvas!.width, canvas!.height)
    }

    function render() {
      const t = (performance.now() - startTime) / 1000

      // Smooth mouse lerp
      smoothMouse.x += (mouse.x - smoothMouse.x) * 0.05
      smoothMouse.y += (mouse.y - smoothMouse.y) * 0.05

      gl!.uniform1f(uTime, t)
      gl!.uniform2f(uMouse, smoothMouse.x, smoothMouse.y)
      gl!.uniform2f(uRes, canvas!.width, canvas!.height)
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4)

      raf = requestAnimationFrame(render)
    }

    function onMove(e: MouseEvent) {
      mouse.x = e.clientX / window.innerWidth
      mouse.y = 1 - e.clientY / window.innerHeight
    }

    resize()
    window.addEventListener('resize', resize, { passive: true })
    window.addEventListener('mousemove', onMove, { passive: true })
    raf = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  )
}
