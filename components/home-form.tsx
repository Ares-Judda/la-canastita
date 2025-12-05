"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Search, Store } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const PRODUCTS = [
    { id: 1, name: "Aguacate", price: 25, image: "/producto1.jpg" },
    { id: 2, name: "Cerveza", price: 22, image: "/producto2.jpg" },
    { id: 3, name: "Carne", price: 18, image: "/producto3.jpg" },
    { id: 4, name: "Fabuloso", price: 30, image: "/producto4.jpg" },
];

export function HomeForm() {
    const router = useRouter();

    // ---------------------------------------
    // ESTADOS
    // ---------------------------------------
    const [search, setSearch] = useState("");
    const [cart, setCart] = useState<any[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    // ---------------------------------------
    // CARGAR CARRITO DESDE LOCALSTORAGE
    // ---------------------------------------
    useEffect(() => {
        const stored = localStorage.getItem("cart");
        if (stored) setCart(JSON.parse(stored));
    }, []);

    const saveCart = (newCart: any[]) => {
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
    };

    // ---------------------------------------
    // MANEJO DE BUSQUEDA
    // ---------------------------------------
    const handleSearch = () => {
        if (!search.trim()) {
            toast.warning("Escribe algo para buscar productos");
            return;
        }
        toast.info(`Buscando "${search}" (demo)…`);
        router.push(`/search?query=${search}`);
    };

    // ---------------------------------------
    // AGREGAR AL CARRITO
    // ---------------------------------------
    const addToCart = (product: any) => {
        const updated = [...cart, product];
        saveCart(updated);

        toast.success(`${product.name} agregado al carrito`);
    };

    // ---------------------------------------
    // ABRIR CARRITO
    // ---------------------------------------
    const openCart = () => {
        if (cart.length === 0) {
            toast.info("Tu carrito está vacío");
        } else {
            router.push("/cart");
        }
    };

    // ---------------------------------------
    // FILTRAR PRODUCTOS
    // ---------------------------------------
    const filteredProducts =
        search.trim() === ""
            ? PRODUCTS
            : PRODUCTS.filter((p) =>
                p.name.toLowerCase().includes(search.toLowerCase())
            );

    return (
        <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
            {/* NAVBAR */}
            <nav className="flex items-center justify-between bg-[#55321e] text-white p-4 rounded-xl shadow-md">
                <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => router.push("/home")}
                >
                    <Store size={24} />
                    <h1 className="font-bold text-xl">Mi Tiendita</h1>
                </div>

                {/* BUSCADOR */}
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        placeholder="Buscar productos..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="px-3 py-2 rounded-lg text-[#55321e] placeholder-[#b46b35] bg-amber-100 focus:outline-none"
                    />
                    <Button className="bg-[#b46b35] hover:bg-[#8d5228]" onClick={handleSearch}>
                        <Search size={18} />
                    </Button>
                </div>

                {/* CARRITO */}
                <Button
                    className="bg-amber-100 text-[#55321e] font-semibold hover:bg-amber-200 relative"
                    onClick={openCart}
                >
                    <ShoppingCart size={20} className="mr-2" />

                    Carrito

                    {/* ÍCONO DEL CONTADOR */}
                    {cart.length > 0 && (
                        <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                            {cart.length}
                        </span>
                    )}
                </Button>
            </nav>

            {/* BANNER */}
            <Card className="bg-white shadow-md rounded-xl overflow-hidden">
                <CardContent className="p-0">
                    <img src="/ofeta.png" alt="Promo" className="w-full h-48 object-cover" />
                </CardContent>
            </Card>

            {/* CATEGORÍAS */}
            <section>
                <h2 className="text-xl font-bold text-content mb-2">Categorías</h2>
                <div className="grid grid-cols-3 gap-4">
                    {["Frutas", "Verduras", "Lácteos", "Limpieza", "Carnes", "Bebidas"].map((cat) => (
                        <div
                            key={cat}
                            onClick={() => {
                                setSelectedCategory(cat);
                                toast.info(`Mostrando categoría ${cat} (demo)`);
                                router.push(`/category/${cat.toLowerCase()}`);
                            }}
                            className={`p-4 text-center rounded-xl shadow cursor-pointer font-semibold text-[#55321e] border transition
                ${selectedCategory === cat
                                    ? "bg-amber-200 border-amber-400"
                                    : "bg-white border-amber-200 hover:bg-amber-100"
                                }
              `}
                        >
                            {cat}
                        </div>
                    ))}
                </div>
            </section>

            {/* PRODUCTOS */}
            <section>
                <h2 className="text-xl font-bold text-content mb-2">Productos</h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {filteredProducts.map((p) => (
                        <Card key={p.id} className="bg-white rounded-xl shadow hover:scale-105 transition">
                            <CardContent className="p-3 flex flex-col items-center gap-2">
                                <img src={p.image} alt={p.name} className="w-24 h-24 object-cover rounded-md" />

                                <p className="font-semibold text-[#55321e]">{p.name}</p>
                                <p className="text-sm text-gray-600">${p.price} MXN</p>

                                <Button
                                    className="bg-[#55321e] text-white w-full hover:bg-[#3a2215]"
                                    onClick={() => addToCart(p)}
                                >
                                    Agregar
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            <footer className="text-center text-[#55321e] opacity-80 text-sm mt-6">
                © {new Date().getFullYear()} Mi Tiendita — Todos los derechos reservados.
            </footer>
        </div>
    );
}
