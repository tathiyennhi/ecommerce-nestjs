import { DataSource, In } from 'typeorm';

import { Menu } from 'src/modules/menu/entities/menu.entity';
import { Category } from 'src/modules/category/entities/category.entity';
import { ProductType } from 'src/modules/product-type/entities/product-type.entity';
import { Product } from 'src/modules/product/entities/product.entity';
import { ChildProduct } from 'src/modules/child-product/entities/child-product.entity';

export async function seedData(dataSource: DataSource): Promise<void> {

  const menuRepository = dataSource.getRepository(Menu);
  const categoryRepository = dataSource.getRepository(Category);
  const productTypeRepository = dataSource.getRepository(ProductType);
  const producteRepository = dataSource.getRepository(Product);
  const childProducteRepository = dataSource.getRepository(ChildProduct);

  // FOR MENU
  console.log("Creating Menu");
  const menuMale = menuRepository.create({name: "Thời trang nam"});
  const menuFemale = menuRepository.create({name: "Thời trang nữ"});
  const menuSale = menuRepository.create({name: "SALE"});
  const menuIntroduce = menuRepository.create({name: "Giới thiệu"});

  await menuRepository.save(menuMale);
  await menuRepository.save(menuFemale);
  await menuRepository.save(menuSale);
  await menuRepository.save(menuIntroduce);
  console.log("Menu created");

  // For category
  console.log("Creating Category");
  const maleDress = categoryRepository.create({
    display_content: "Quần",
    menu: menuMale
  })
  const maleDress1 = categoryRepository.create({
    display_content: "Áo",
    menu: menuMale
  })

  const femaleDress = categoryRepository.create({
    display_content: "Quần",
    menu: menuFemale
  })
  const femaleDress1 = categoryRepository.create({
    display_content: "Áo",
    menu: menuFemale
  })
  const femaleDress2 = categoryRepository.create({
    display_content: "Váy",
    menu: menuFemale
  })
  const femaleDress3 = categoryRepository.create({
    display_content: "Nội y chếch chi",
    menu: menuFemale
  })
  await categoryRepository.save([maleDress, maleDress1, femaleDress, femaleDress1, femaleDress2, femaleDress3]);
  console.log("Category created");

  // For product type
  // male
  console.log("ProductType creating");
  const productTypeMale = productTypeRepository.create({
    display_content: "Quần tây",
    category: maleDress
  })
  const productTypeMale1 = productTypeRepository.create({
    display_content: "Quần Jogger",
    category: maleDress
  })
  const productTypeMale2 = productTypeRepository.create({
    display_content: "Quần thể thao",
    category: maleDress
  })
  const productTypeMale3 = productTypeRepository.create({
    display_content: "Quần shorts",
    category: maleDress
  })
  const productTypeMale11 = productTypeRepository.create({
    display_content: "Áo sơ mi",
    category: maleDress1
  })
  const productTypeMale12 = productTypeRepository.create({
    display_content: "Áo thun",
    category: maleDress1
  })

  // female
  const productTypeFemale = productTypeRepository.create({
    display_content: "Quần tây",
    category: femaleDress
  })
  const productTypeFemale1 = productTypeRepository.create({
    display_content: "Quần thể thao",
    category: femaleDress
  })
  const productTypeFemale2 = productTypeRepository.create({
    display_content: "Áo thun",
    category: femaleDress1
  })
  const productTypeFemale3 = productTypeRepository.create({
    display_content: "Áo đi biển",
    category: femaleDress1
  })
  const productTypeFemale4 = productTypeRepository.create({
    display_content: "Váy dài",
    category: femaleDress2
  })
  const productTypeFemale5 = productTypeRepository.create({
    display_content: "Váy ngắn",
    category: femaleDress2
  })
  const productTypeFemale6 = productTypeRepository.create({
    display_content: "Áo nội iii",
    category: femaleDress3
  })
  const productTypeFemale7 = productTypeRepository.create({
    display_content: "Quần nội ii",
    category: femaleDress3
  })
  await productTypeRepository.save([productTypeMale, productTypeMale1, productTypeMale2, productTypeMale3, productTypeMale11, productTypeMale12]);
  await productTypeRepository.save([productTypeFemale, productTypeFemale1, productTypeFemale2, productTypeFemale3, productTypeFemale4, productTypeFemale5, productTypeFemale6, productTypeFemale7]);
  console.log("ProductType created");

  // For product
  console.log("Product creating");
  // male
  const productMaleTrousers = producteRepository.create({
    display_content: "Quần Dài Nam Thể Thao Pro Active",
    code: "0020728",
    fabric: "Vải Dù SORONA AGILE",
    product_type: productTypeMale1
  })
  const productMaleTrousers1 = producteRepository.create({
    display_content: "Quần dài nam Daily Pants",
    code: "0020729",
    fabric: "47% Polyester Sorona + 53% Polyester",
    product_type: productTypeMale1
  })
  const productMaleTrousers2 = producteRepository.create({
    display_content: "Quần âu nam chất lượng MTR001K4",
    code: "MTR001K4",
    fabric: "47% Polyester Sorona + 53% Polyester",
    product_type: productTypeMale
  })
  const productMaleTrousers3 = producteRepository.create({
    display_content: "Quần Vải Nam Form Slim - 10F21PFO001CR1",
    code: "10F21PFO001CR1",
    fabric: "47% Polyester Sorona + 53% Polyester",
    product_type: productTypeMale
  })
  // female
  const productFemaleTrousers = producteRepository.create({
    display_content: "Quần Dài Nữ Thể Thao Pro Active",
    code: "0020738",
    fabric: "Vải Dù SORONA AGILE",
    product_type: productTypeFemale1
  })
  const productFemaleTrousers1 = producteRepository.create({
    display_content: "Quần dài nữ Daily Pants",
    code: "0020739",
    fabric: "47% Polyester Sorona + 53% Polyester",
    product_type: productTypeFemale1
  })
  const productFemaleTrousers2 = producteRepository.create({
    display_content: "Quần âu nữ chất lượng MTR001K4",
    code: "MTR002K4",
    fabric: "47% Polyester Sorona + 53% Polyester",
    product_type: productTypeFemale
  })
  const productFemaleTrousers3 = producteRepository.create({
    display_content: "Quần Vải nữ Form Slim - 10F21PFO001CR1",
    code: "10F21PFO002CR1",
    fabric: "47% Polyester Sorona + 53% Polyester",
    product_type: productTypeFemale
  })
  await producteRepository.save([productMaleTrousers, productMaleTrousers1, productMaleTrousers2, productMaleTrousers3])
  await producteRepository.save([productFemaleTrousers, productFemaleTrousers1, productFemaleTrousers2, productFemaleTrousers3])
  console.log("Product created");

  // For child product
  const productMaleTrousersSizeS = childProducteRepository.create({
    
  })
  const productMaleTrousersSizeM = 
}