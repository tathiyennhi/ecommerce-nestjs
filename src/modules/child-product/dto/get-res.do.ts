import { Expose, Exclude } from "class-transformer";

export class GetChildProductResDto {
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

  @Expose({ name: "name" })
  name: string;

  @Expose({ name: "price" })
  price: number;

  @Expose({ name: "color" })
  color: string;

  @Expose({ name: "size" })
  size: string;

  @Expose({ name: "quantity" })
  quantity: number;

  @Expose({ name: "sell_off_info" })
  sellOffInfo: string;

  @Expose({ name: "image_link" })
  imageLink: string;

  @Expose({ name: "is_default_product" })
  isDefaultProduct: boolean;

  @Exclude()
  created_at: Date;

  @Exclude()
  updated_at: Date;
}
