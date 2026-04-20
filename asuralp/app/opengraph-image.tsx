import { generateSocialCard } from "./social-card";

export const alt = "ASURA | Terminal LP";
export const size = {
  width: 1200,
  height: 630
};
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return generateSocialCard(size);
}
