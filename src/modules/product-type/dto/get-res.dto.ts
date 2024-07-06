// GetCategoryResDto
import { Expose, Exclude } from "class-transformer";

export class GetProductTypeResDto {
  @Expose({ name: "id" })
  id: string;

  @Expose({ name: "description" })
  description: string;

  @Expose({ name: "display_content" })
  displayContent: string;

  @Exclude()
  created_at: Date;

  @Exclude()
  updated_at: Date;
}
