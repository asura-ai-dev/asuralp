import { generateSocialCard } from "./social-card";

export const alt = "ASURA | Terminal LP";
export const size = {
  width: 1200,
  height: 600
};
export const contentType = "image/png";

export default async function TwitterImage() {
  return generateSocialCard(size);
}
