import rawContent from "@/data/content.json";
import type { PortfolioContent } from "@/lib/content-schema";
import { portfolioSchema } from "@/lib/content-schema";

export const portfolioContent: PortfolioContent = portfolioSchema.parse(rawContent);

export type { PortfolioContent };

