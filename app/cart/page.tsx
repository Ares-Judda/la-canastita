"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2 } from "lucide-react";

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([]);

  // CARGAR CARRITO
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      const parsed = JSON.parse(stored).map((item: any) => ({
        ...item,
        price: Number(item.price),
        qty: Number(item.qty ?? 1),
      }));
      setCart(parsed);
    }
  }, []);

  // GUARDAR CAMBIOS
  const updateCart = (updated: any[]) => {
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // INCREMENTAR
  const increaseQty = (id: number) => {
    const updated = cart.map((item) =>
      item.id === id ? { ...item, qty: item.qty + 1 } : item
    );
    updateCart(updated);
  };

  // DECREMENTAR
  const decreaseQty = (id: number) => {
    const updated = cart.map((item) =>
      item.id === id ? { ...item, qty: Math.max(1, item.qty - 1) } : item
    );
    updateCart(updated);
  };

  // ELIMINAR
  const removeItem = (id: number) => {
    const updated = cart.filter((item) => item.id !== id);
    updateCart(updated);
  };

  // CALCULOS
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const shipping = subtotal > 0 ? 35 : 0;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-[#fdf7f2] p-6 md:p-10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        
        {/* LISTA DE PRODUCTOS */}
        <div className="md:col-span-2 space-y-6">
          <Card className="shadow-lg rounded-2xl bg-white">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-[#55321e]">
                🛒 Tu Carrito
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              {cart.length === 0 ? (
                <p className="text-center text-gray-600 py-20 text-lg">
                  Tu carrito está vacío
                </p>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center p-4 bg-[#faf3eb] border border-[#ecd8c7] rounded-xl shadow"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}    // <--- FUNCIONA AHORA
                        className="w-20 h-20 rounded-lg shadow object-cover"
                      />
                      <div>
                        <p className="text-lg font-semibold text-[#55321e]">
                          {item.name}
                        </p>
                        <p className="text-sm text-gray-700">
                          ${item.price.toFixed(2)} MXN
                        </p>
                      </div>
                    </div>

                    {/* CONTROLES */}
                    <div className="flex items-center gap-3">
                      <Button
                        variant="secondary"
                        className="bg-[#e7d3c3] hover:bg-[#d8bfae]"
                        onClick={() => decreaseQty(item.id)}
                      >
                        -
                      </Button>

                      <span className="font-bold text-lg">{item.qty}</span>

                      <Button
                        variant="secondary"
                        className="bg-[#e7d3c3] hover:bg-[#d8bfae]"
                        onClick={() => increaseQty(item.id)}
                      >
                        +
                      </Button>

                      <Button
                        variant="ghost"
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={20} />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* RESUMEN */}
        <div>
          <Card className="shadow-xl rounded-2xl bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-[#55321e]">
                Resumen
              </CardTitle>
            </CardHeader>

            <CardContent className="text-[#55321e] text-lg space-y-4">
              <div className="flex justify-between">
                <p>Subtotal:</p>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <p>Envío:</p>
                <span>${shipping.toFixed(2)}</span>
              </div>

              <hr />

              <div className="flex justify-between font-bold text-xl">
                <p>Total:</p>
                <span>${total.toFixed(2)}</span>
              </div>

              <Button className="w-full bg-[#55321e] hover:bg-[#3b2619] text-white py-3 text-lg mt-4 rounded-xl">
                Proceder al Pago
              </Button>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
