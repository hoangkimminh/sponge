import { Module } from "@nestjs/common"
import { RendererModule } from "../renderer/renderer.module"
import { ScraperController } from "./scraper.controller"
import { ScraperService } from "./scraper.service"
import { ResourcesModule } from "../resources/resources.module"

@Module({
  imports: [ResourcesModule, RendererModule],
  controllers: [ScraperController],
  providers: [ScraperService],
})
export class ScraperModule {}
