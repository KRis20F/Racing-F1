import type { Car } from "@/app/api/endpoints/cars.endpoints";
import { useContext } from "react";
import { ShopContext } from "../services/shop.context";

interface CardCardProps {
    car: Car
}


export function CarCard({ car }: CardCardProps) {

    const { handleBuy } = useContext(ShopContext);


    return <div className="p-5 bg-pink-200 rounded-xl text-slate-900 hover:bg-pink-100">
        <p>Id: {car.id}</p>
        <p>Name: {car.name}</p>
        <p>Price: {car.price}$</p>

        <button className="p-2 bg-white border-2 border-pink-400 rounded-2xl cursor-pointer hover:bg-amber-50" onClick={() => handleBuy(car)}>Buy</button>
    </div>
}