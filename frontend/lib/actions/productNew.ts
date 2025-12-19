"use server";

import { productsAPI, brandsAPI, categoriesAPI, colorsAPI, sizesAPI, gendersAPI } from "@/lib/api/client";

export type Review = {
  id: string;
  rating: number;
  comment: string;
  userId: string;
  userName: string;
  createdAt: Date;
};

export type RecommendedProduct = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
};

export type ProductDetail = {
  id: string;
  name: string;
  description: string;
  price: number;
  images: Array<{
    id: string;
    url: string;
    isPrimary: boolean;
  }>;
  variants: Array<{
    id: string;
    sku: string;
    price: number;
    salePrice?: number;
    color: { name: string; hex: string };
    size: { name: string; label: string };
    inStock: number;
  }>;
  brand?: { name: string; slug: string };
  category?: { name: string; slug: string };
  gender?: { name: string; slug: string };
};

// دریافت تمام محصولات
export async function getAllProducts(filters?: Record<string, any>) {
  try {
    const response = await productsAPI.getAll(filters);
    
    return {
      products: response.data?.products || [],
      totalCount: response.data?.pagination?.total || 0
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      products: [],
      totalCount: 0
    };
  }
}

// دریافت یک محصول
export async function getProduct(id: string): Promise<ProductDetail | null> {
  try {
    const response = await productsAPI.getById(id);
    
    if (!response.success) {
      return null;
    }

    const product = response.data;
    
    return {
      id: product._id,
      name: product.name,
      description: product.description,
      price: product.variants?.[0]?.price || 0,
      images: product.images || [],
      variants: product.variants || [],
      brand: product.brandId,
      category: product.categoryId,
      gender: product.genderId
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

// دریافت نظرات محصول
export async function getProductReviews(productId: string): Promise<Review[]> {
  try {
    // TODO: پیاده‌سازی نظرات
    return [];
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
}

// دریافت محصولات توصیه‌شده
export async function getRecommendedProducts(productId: string): Promise<RecommendedProduct[]> {
  try {
    const response = await productsAPI.getAll({ limit: 4 });
    
    return response.data?.products?.map((p: any) => ({
      id: p._id,
      name: p.name,
      price: p.variants?.[0]?.price || 0,
      imageUrl: p.images?.[0]?.url || "/placeholder.jpg"
    })) || [];
  } catch (error) {
    console.error("Error fetching recommended products:", error);
    return [];
  }
}

// دریافت برندها
export async function getBrands() {
  try {
    const response = await brandsAPI.getAll();
    return response.data || [];
  } catch (error) {
    console.error("Error fetching brands:", error);
    return [];
  }
}

// دریافت دسته‌بندی‌ها
export async function getCategories() {
  try {
    const response = await categoriesAPI.getAll();
    return response.data || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

// دریافت رنگ‌ها
export async function getColors() {
  try {
    const response = await colorsAPI.getAll();
    return response.data || [];
  } catch (error) {
    console.error("Error fetching colors:", error);
    return [];
  }
}

// دریافت سایزها
export async function getSizes() {
  try {
    const response = await sizesAPI.getAll();
    return response.data || [];
  } catch (error) {
    console.error("Error fetching sizes:", error);
    return [];
  }
}

// دریافت جنسیت‌ها
export async function getGenders() {
  try {
    const response = await gendersAPI.getAll();
    return response.data || [];
  } catch (error) {
    console.error("Error fetching genders:", error);
    return [];
  }
}
