// Types shared between client and server

export interface User {
    id: number
    email: string
    password?: string
    role: UserRole
    createdAt: Date
    updatedAt: Date
}

export interface Supplier {
    id: number
    name: string
    contactEmail?: string
    contactPhone?: string
    contactAddress?: string
    createdAt: Date
    updatedAt: Date
}

export interface Material {
    id: number
    name: string
    category: MaterialCategory
    supplierId: number
    supplier?: Supplier
    color?: string
    density?: number
    price?: number
    unit?: string
    createdAt: Date
    updatedAt: Date
}

export interface Furniture {
    id: number
    name: string
    category: FurnitureCategory
    description?: string
    width?: number
    height?: number
    depth?: number
    dimensionUnit?: string
    status: FurnitureStatus
    createdAt: Date
    updatedAt: Date
    materials?: FurnitureMaterial[]
    keywords?: string[]
    images?: FurnitureImage[]
}

export interface FurnitureMaterial {
    id: number
    furnitureId: number
    materialId: number
    material?: Material
    quantity: number
    unit: string
    createdAt: Date
}

export interface FurnitureKeyword {
    id: number
    furnitureId: number
    keyword: string
    createdAt: Date
}

export interface FurnitureImage {
    id: number
    furnitureId: number
    imageUrl: string
    altText?: string
    isPrimary: boolean
    createdAt: Date
}

// Enums
export enum UserRole {
    ADMIN = "admin",
    USER = "user",
}

export enum MaterialCategory {
    WOOD = "wood",
    IRON = "iron",
    PLASTIC = "plastic",
}

export enum MaterialType {
    // Wood
    ASH = "ash",
    OAK = "oak",
    WALNUT = "walnut",
    // Iron
    STAINLESS_STEEL = "stainless steel",
    ALUMINUM = "aluminum",
    // Plastic
    PLASTIC = "plastic",
}

export enum FurnitureCategory {
    CABINET = "cabinet",
    SHELF = "shelf",
}

export enum FurnitureStatus {
    DESIGN = "design",
    PRODUCTION = "production",
    FINISHED = "finished",
}

export enum SupplierName {
    BBOIS = "BBois",
    METALO = "MetaLo",
    PPLASTIQUE = "pPlastique",
}

// Types for APIs
export interface ApiResponse<T> {
    success: boolean
    data?: T
    message?: string
    error?: string
}

export interface LoginRequest {
    email: string
    password: string
}

export interface LoginResponse {
    token: string
    user: Omit<User, "password">
}

export interface CreateFurnitureRequest {
    name: string
    category: FurnitureCategory
    description?: string
    width?: number
    height?: number
    depth?: number
    dimensionUnit?: string
    materials: Array<{
        materialId: number
        quantity: number
        unit: string
    }>
    keywords: string[]
}

export interface CreateMaterialRequest {
    name: string
    category: MaterialCategory
    supplierId: number
    color?: string
    density?: number
    price?: number
    unit?: string
}

// Types for statistics
export interface FurnitureStats {
    totalFurniture: number
    furnitureByCategory: Record<FurnitureCategory, number>
    furnitureByStatus: Record<FurnitureStatus, number>
    mostUsedMaterials: Array<{
        material: Material
        usageCount: number
    }>
    supplierUsage: Array<{
        supplier: Supplier
        furnitureCount: number
        totalUsage: number
    }>
    materialsByCategory: Record<MaterialCategory, number>
}
