import { Expose, Exclude, Type } from "class-transformer";
import { GetChildProductResDto } from "src/modules/child-product/dto/get-res.do";

export class GetProductResDto {
  @Expose({ name: "id" })
  id: string;

  @Expose({ name: "description" })
  description: string;

  @Expose({ name: "display_content" })
  displayContent: string;

  @Expose({ name: "fabric" })
  fabric: string;

  @Expose({ name: "code" })
  code: string;

  @Exclude()
  created_at: Date;

  @Exclude()
  updated_at: Date;

  @Expose({ name: "child_products" })
  @Type(() => GetChildProductResDto)
  childProducts: GetChildProductResDto[];
}
