import { DataSource } from "typeorm";

import { Menu } from "src/modules/menu/entities/menu.entity";
import { Category } from "src/modules/category/entities/category.entity";
import { ProductType } from "src/modules/product-type/entities/product-type.entity";
import { Product } from "src/modules/product/entities/product.entity";
import { ChildProduct } from "src/modules/child-product/entities/child-product.entity";
import { Permission } from "src/modules/permission/entities/permission.entity";
import { Role } from "src/modules/role/entities/role.entity";
import { Route } from "src/modules/route/entities/route.entity";
import { Admin } from "src/modules/admin/entities/admin.entity";
import { Utils } from "src/common/utils/utils";

export async function seedData(dataSource: DataSource): Promise<void> {
  // @TODO: change this pass for your system
  const superAdminPass = "_Pass1234_!";
  //   const menuRepository = dataSource.getRepository(Menu);
  //   const categoryRepository = dataSource.getRepository(Category);
  //   const productTypeRepository = dataSource.getRepository(ProductType);
  //   const producteRepository = dataSource.getRepository(Product);
  //   const childProducteRepository = dataSource.getRepository(ChildProduct);

  const queryRunner = dataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();
  try {
    // FOR PERMISSION | ROUTE | ROLE
    // const permissionRepository = dataSource.getRepository(Permission);
    // const roleRepository = dataSource.getRepository(Role);
    // const routeRepository = dataSource.getRepository(Route);

    // FOR MENU
    console.log("Creating Menu");
    const menuMale = queryRunner.manager.create(Menu, {
      name: "Thời trang nam",
    });
    const menuFemale = queryRunner.manager.create(Menu, {
      name: "Thời trang nữ",
    });
    const menuSale = queryRunner.manager.create(Menu, { name: "SALE" });
    const menuIntroduce = queryRunner.manager.create(Menu, {
      name: "Giới thiệu",
    });

    await queryRunner.manager.save(menuMale);
    await queryRunner.manager.save(menuFemale);
    await queryRunner.manager.save(menuSale);
    await queryRunner.manager.save(menuIntroduce);
    console.log("Menu created");

    // For category
    console.log("Creating Category");
    const maleDress = queryRunner.manager.create(Category, {
      display_content: "Quần",
      menu: menuMale,
    });
    const maleDress1 = queryRunner.manager.create(Category, {
      display_content: "Áo",
      menu: menuMale,
    });

    const femaleDress = queryRunner.manager.create(Category, {
      display_content: "Quần",
      menu: menuFemale,
    });
    const femaleDress1 = queryRunner.manager.create(Category, {
      display_content: "Áo",
      menu: menuFemale,
    });
    const femaleDress2 = queryRunner.manager.create(Category, {
      display_content: "Váy",
      menu: menuFemale,
    });
    const femaleDress3 = queryRunner.manager.create(Category, {
      display_content: "Nội y chếch chi",
      menu: menuFemale,
    });
    await queryRunner.manager.save([
      maleDress,
      maleDress1,
      femaleDress,
      femaleDress1,
      femaleDress2,
      femaleDress3,
    ]);
    console.log("Category created");

    // For product type
    // male
    console.log("ProductType creating");
    const productTypeMale = queryRunner.manager.create(ProductType, {
      display_content: "Quần tây",
      category: maleDress,
    });
    const productTypeMale1 = queryRunner.manager.create(ProductType, {
      display_content: "Quần Jogger",
      category: maleDress,
    });
    const productTypeMale2 = queryRunner.manager.create(ProductType, {
      display_content: "Quần thể thao",
      category: maleDress,
    });
    const productTypeMale3 = queryRunner.manager.create(ProductType, {
      display_content: "Quần shorts",
      category: maleDress,
    });
    const productTypeMale11 = queryRunner.manager.create(ProductType, {
      display_content: "Áo sơ mi",
      category: maleDress1,
    });
    const productTypeMale12 = queryRunner.manager.create(ProductType, {
      display_content: "Áo thun",
      category: maleDress1,
    });

    // female
    const productTypeFemale = queryRunner.manager.create(ProductType, {
      display_content: "Quần tây",
      category: femaleDress,
    });
    const productTypeFemale1 = queryRunner.manager.create(ProductType, {
      display_content: "Quần thể thao",
      category: femaleDress,
    });
    const productTypeFemale2 = queryRunner.manager.create(ProductType, {
      display_content: "Áo thun",
      category: femaleDress1,
    });
    const productTypeFemale3 = queryRunner.manager.create(ProductType, {
      display_content: "Áo đi biển",
      category: femaleDress1,
    });
    const productTypeFemale4 = queryRunner.manager.create(ProductType, {
      display_content: "Váy dài",
      category: femaleDress2,
    });
    const productTypeFemale5 = queryRunner.manager.create(ProductType, {
      display_content: "Váy ngắn",
      category: femaleDress2,
    });
    const productTypeFemale6 = queryRunner.manager.create(ProductType, {
      display_content: "Áo nội iii",
      category: femaleDress3,
    });
    const productTypeFemale7 = queryRunner.manager.create(ProductType, {
      display_content: "Quần nội ii",
      category: femaleDress3,
    });
    await queryRunner.manager.save([
      productTypeMale,
      productTypeMale1,
      productTypeMale2,
      productTypeMale3,
      productTypeMale11,
      productTypeMale12,
    ]);
    await queryRunner.manager.save([
      productTypeFemale,
      productTypeFemale1,
      productTypeFemale2,
      productTypeFemale3,
      productTypeFemale4,
      productTypeFemale5,
      productTypeFemale6,
      productTypeFemale7,
    ]);
    console.log("ProductType created");

    // For product
    console.log("Product creating");
    // male
    const productMaleTrousers = queryRunner.manager.create(Product, {
      display_content: "Quần Dài Nam Thể Thao Pro Active",
      code: "0020728",
      fabric: "Vải Dù SORONA AGILE",
      product_type: productTypeMale1,
    });
    const productMaleTrousers1 = queryRunner.manager.create(Product, {
      display_content: "Quần dài nam Daily Pants",
      code: "0020729",
      fabric: "47% Polyester Sorona + 53% Polyester",
      product_type: productTypeMale1,
    });
    const productMaleTrousers2 = queryRunner.manager.create(Product, {
      display_content: "Quần âu nam chất lượng MTR001K4",
      code: "MTR001K4",
      fabric: "47% Polyester Sorona + 53% Polyester",
      product_type: productTypeMale,
    });
    const productMaleTrousers3 = queryRunner.manager.create(Product, {
      display_content: "Quần Vải Nam Form Slim - 10F21PFO001CR1",
      code: "10F21PFO001CR1",
      fabric: "47% Polyester Sorona + 53% Polyester",
      product_type: productTypeMale,
    });
    // female
    const productFemaleTrousers = queryRunner.manager.create(Product, {
      display_content: "Quần Dài Nữ Thể Thao Pro Active",
      code: "0020738",
      fabric: "Vải Dù SORONA AGILE",
      product_type: productTypeFemale1,
    });
    const productFemaleTrousers1 = queryRunner.manager.create(Product, {
      display_content: "Quần dài nữ Daily Pants",
      code: "0020739",
      fabric: "47% Polyester Sorona + 53% Polyester",
      product_type: productTypeFemale1,
    });
    const productFemaleTrousers2 = queryRunner.manager.create(Product, {
      display_content: "Quần âu nữ chất lượng MTR001K4",
      code: "MTR002K4",
      fabric: "47% Polyester Sorona + 53% Polyester",
      product_type: productTypeFemale,
    });
    const productFemaleTrousers3 = queryRunner.manager.create(Product, {
      display_content: "Quần Vải nữ Form Slim - 10F21PFO001CR1",
      code: "10F21PFO002CR1",
      fabric: "47% Polyester Sorona + 53% Polyester",
      product_type: productTypeFemale,
    });
    await queryRunner.manager.save([
      productMaleTrousers,
      productMaleTrousers1,
      productMaleTrousers2,
      productMaleTrousers3,
    ]);
    await queryRunner.manager.save([
      productFemaleTrousers,
      productFemaleTrousers1,
      productFemaleTrousers2,
      productFemaleTrousers3,
    ]);
    console.log("Product created");

    // For child product
    const productMaleTrousersRedSizeS = queryRunner.manager.create(
      ChildProduct,
      {
        name: "Quần Dài Nam Thể Thao Pro Active",
        price: 100000,
        color: "red",
        size: "S",
        quantity: 70,
        product: productMaleTrousers,
      },
    );
    const productMaleTrousersRedSizeM = queryRunner.manager.create(
      ChildProduct,
      {
        name: "Quần Dài Nam Thể Thao Pro Active",
        price: 100000,
        color: "red",
        size: "M",
        quantity: 70,
        product: productMaleTrousers,
      },
    );
    const productMaleTrousersGreebSizeS = queryRunner.manager.create(
      ChildProduct,
      {
        name: "Quần Dài Nam Thể Thao Pro Active",
        price: 100000,
        color: "green",
        size: "S",
        quantity: 50,
        product: productMaleTrousers,
      },
    );
    const productMaleTrousersGreenSizeM = queryRunner.manager.create(
      ChildProduct,
      {
        name: "Quần Dài Nam Thể Thao Pro Active",
        price: 100000,
        color: "green",
        size: "M",
        quantity: 60,
        product: productMaleTrousers,
      },
    );
    await queryRunner.manager.save([
      productMaleTrousersRedSizeS,
      productMaleTrousersRedSizeM,
      productMaleTrousersGreebSizeS,
      productMaleTrousersGreenSizeM,
    ]);

    const productFemaleTrousersRedSizeS = queryRunner.manager.create(
      ChildProduct,
      {
        name: "Quần Dài Nữ Thể Thao Pro Active",
        price: 100000,
        color: "red",
        size: "S",
        quantity: 70,
        product: productFemaleTrousers,
      },
    );
    const productFemaleTrousersRedSizeM = queryRunner.manager.create(
      ChildProduct,
      {
        name: "Quần Dài Nữ Thể Thao Pro Active",
        price: 100000,
        color: "red",
        size: "M",
        quantity: 70,
        product: productFemaleTrousers,
      },
    );
    await queryRunner.manager.save([
      productFemaleTrousersRedSizeS,
      productFemaleTrousersRedSizeM,
    ]);

    const roleAdmin = queryRunner.manager.create(Role, {
      name: "admin",
      created_by: "init-process",
      updated_by: "init-process",
    });
    const superAdminRole = queryRunner.manager.create(Role, {
      name: "super-admin",
      created_by: "init-process",
      updated_by: "init-process",
    });
    const roleUser = queryRunner.manager.create(Role, {
      name: "user",
      created_by: "init-process",
      updated_by: "init-process",
    });
    await queryRunner.manager.save([roleAdmin, roleUser, superAdminRole]);

    const handleMenu = queryRunner.manager.create(Permission, {
      name: "HANDLE_MENU",
      created_by: "init-process",
      updated_by: "init-process",
    }); // CRUD
    const handleCate = queryRunner.manager.create(Permission, {
      name: "HANDLE_CATEGORY",
      created_by: "init-process",
      updated_by: "init-process",
    });
    const handleProductType = queryRunner.manager.create(Permission, {
      name: "HANDLE_PRODUCT_TYPE",
      created_by: "init-process",
      updated_by: "init-process",
    });
    const handleProduct = queryRunner.manager.create(Permission, {
      name: "HANDLE_PRODUCT",
      created_by: "init-process",
      updated_by: "init-process",
    });
    const handleChildProduct = queryRunner.manager.create(Permission, {
      name: "HANDLE_CHILD_PRODUCT",
      created_by: "init-process",
      updated_by: "init-process",
    });
    const handleAdmin = queryRunner.manager.create(Permission, {
      name: "HANDLE_ADMIN",
      created_by: "init-process",
      updated_by: "init-process",
    });
    await queryRunner.manager.save([
      handleMenu,
      handleCate,
      handleProductType,
      handleProduct,
      handleChildProduct,
      handleAdmin,
    ]);

    const createMenuRoute = queryRunner.manager.create(Route, {
      method: "POST",
      route: "/menu",
      created_by: "init-process",
      updated_by: "init-process",
    });
    const createCategoryRoute = queryRunner.manager.create(Route, {
      method: "POST",
      route: "/category",
      created_by: "init-process",
      updated_by: "init-process",
    });
    const createProductTypeRoute = queryRunner.manager.create(Route, {
      method: "POST",
      route: "/product-types",
      created_by: "init-process",
      updated_by: "init-process",
    });
    const createProductRoute = queryRunner.manager.create(Route, {
      method: "POST",
      route: "/product",
      created_by: "init-process",
      updated_by: "init-process",
    });
    const createChildProductRoute = queryRunner.manager.create(Route, {
      method: "POST",
      route: "/child-product",
      created_by: "init-process",
      updated_by: "init-process",
    });

    createMenuRoute.permissions = [handleMenu];
    createCategoryRoute.permissions = [handleCate];
    createProductTypeRoute.permissions = [handleProductType];
    createProductRoute.permissions = [handleProduct];
    createChildProductRoute.permissions = [handleChildProduct];

    createMenuRoute.roles = [roleAdmin, superAdminRole];
    createCategoryRoute.roles = [roleAdmin, superAdminRole];
    createProductTypeRoute.roles = [roleAdmin, superAdminRole];
    createProductRoute.roles = [roleAdmin, superAdminRole];
    createChildProductRoute.roles = [roleAdmin, superAdminRole];
    await queryRunner.manager.save([
      createMenuRoute,
      createCategoryRoute,
      createProductTypeRoute,
      createProductRoute,
      createChildProductRoute,
    ]);

    // create super admin -> admin with full system permission
    console.log("add super admin");
    const superAdmin = queryRunner.manager.create(Admin, {
      email: "caonhungoc1996@gmail.com",
      name: "super-admin",
      created_by: "init-process",
      updated_by: "init-process",
      password: Utils.md5Hash(superAdminPass),
    });
    superAdmin.roles = [superAdminRole]; // created_by
    superAdmin.permissions = [
      handleMenu,
      handleCate,
      handleProductType,
      handleProduct,
      handleChildProduct,
    ]; // created_by
    await queryRunner.manager.save([superAdmin]);
    console.log("DONE add super admin '\n' ");

    console.log("add admin");
    const admin = queryRunner.manager.create(Admin, {
      email: "admin00@gmail.com",
      name: "admin-00",
      created_by: "init-process",
      updated_by: "init-process",
      password: Utils.md5Hash(superAdminPass),
    });
    admin.roles = [roleAdmin]; // created_by
    admin.permissions = [
      handleMenu,
      handleCate,
      handleProductType,
      handleProduct,
      handleChildProduct,
    ]; // created_by
    await queryRunner.manager.save([admin]);
    console.log("DONE add admin");

    await queryRunner.commitTransaction();
    console.log("init DATA DONE");
  } catch (error) {
    console.log(error.message, "-- > INIT DATA ERROR -> START ROLLBACK");
    await queryRunner.rollbackTransaction();
    console.log("---> ROLLBACK DONE");
  } finally {
    await queryRunner.release();
  }
}
