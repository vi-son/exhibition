#pragma glslify: pillow = require(./pillow)

float rand(vec2 n) { 
	return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float noise(vec2 p){
	vec2 ip = floor(p);
	vec2 u = fract(p);
	u = u*u*(3.0-2.0*u);
	
	float res = mix(
		mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
		mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
	return res*res;
}

uniform vec2 uResolution;

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  vec3 color = vec3(0.0);

  vec4 color_a = vec4(22.0 / 255.0, 18.0 / 255.0, 60.0 / 255.0, 1.0);
  vec4 color_b = vec4(57.0 / 255.0, 53.0 / 255.0, 90.0 / 255.0, 1.0);

  vec2 gamma = vec2(6.0);
  
  color = pillow(color_a, color_b, gamma, uv).rgb + rand(uv * 100.0) / 100.0;

  gl_FragColor = vec4(color, 1.0);
}
