precision highp float;

vec4 pillow(in vec4 color_a, in vec4 color_b, in vec2 gamma, in vec2 uv)
{
  vec4 color = vec4(0.0);
  color.xy =
    (uv.st * 2.0 - vec2(1.0)) * 0.5 * vec2(-1, 1) * // x
    (uv.st * 2.0 - vec2(1.0)) * 0.5 * vec2(-1, 1) + 0.5; // y

  float fade =
    pow(smoothstep(-1.0, 1.0, 1.0 - 0.5 * (color.x - 0.5)), pow(2.0, gamma.x)) *
    pow(smoothstep(-1.0, 1.0, 1.0 - 0.5 * (color.y - 0.5)), pow(2.0, gamma.y));

  color = mix(color_a, color_b, fade);
  return color;
}

#pragma glslify: export(pillow)
