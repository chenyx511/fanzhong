/**
 * 图片资源 - 通过 import 引入，由 Vite 在构建时处理路径，确保 GitHub Pages 等子路径部署时能正确加载
 */
import heroBg from './hero-bg.jpg';
import worldMap from './world-map-new.jpg';
import productFragrance from './product-fragrance.jpg';
import productIndustrial from './product-industrial.jpg';
import productElectronics from './product-electronics.jpg';
import productDaily from './product-daily.jpg';

export const images = {
  heroBg,
  worldMap,
  productFragrance,
  productIndustrial,
  productElectronics,
  productDaily,
} as const;
