import React from "react";
import Layout from "../Components/Layout";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { DatePicker } from 'antd';
import { rentCar } from "../Redux/Actions/Rent";
import { useDispatch } from "react-redux";


const { RangePicker } = DatePicker;

const Cars = () => {

    const dispatch = useDispatch();


    const navigate = useNavigate();

    const [car, setCar] = useState([]);
    const [from, setFrom] = useState();
    const [to, setTo] = useState();
    const [totalDays, setTotalDays] = useState(0);
    const [total, setTotal] = useState();

    const userInfo = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;


    const params = useParams();
        const {carId} = params;


    useEffect(() => {
        if(!localStorage.getItem('user')){
            navigate('/login');
        }

    const fetchData = async () => {

        try{
            const result = await axios.get(`/api/cars/cars/${carId}`);
            console.log(result.data);
            setCar(result.data);

        }catch(err){
            console.log("Hiba!");
        }

    }
    fetchData();


    setTotal((totalDays * car.osszeg_per_nap));

    }, [carId, navigate, totalDays, car.osszeg_per_nap]);


    const selectTime = (values) => {
        setFrom(values[0].format("YYYY-MMM-DD HH:mm"));
        setTo(values[1].format("YYYY-MMM-DD HH:mm"));

        setTotalDays(values[1].diff(values[0], 'Days'));
    }


    const rentNow = () => {
        const reqObj = {
            user: userInfo._id,
            car: car._id,
            totalDays,
            total,
            foglaltidoszak: {
                from,
                to,
            },
        };


        dispatch(rentCar(reqObj));
        navigate('/')
    }


    return(
        <Layout>
            <div className="car-container">
                <h3 className="car-title2">Bérelj ki egy autót</h3>
                <div className="car-row">
                    <div className="car-col">
                        <div className="car-groups">
                            <div className="car-group">
                                <h2 className="car-subtitle">Autó adatok</h2>
                                <div className="car-info">
                                    <span>{car.gyarto} {car.model}</span>
                                    <span>{car.osszeg_per_nap} FT / Nap</span>
                                    <span>Üzemanyag típus: {car.uzemanyag}</span>
                                    <span>Szállítható személyek száma: {car.szallithato_szemelyek_szama}</span>
                                </div>
                            </div>
                            <div className="car-group">
                                <h2 className="car-subtitle">Béreld ki az autót</h2>
                                <div className="car-info">
                                    <RangePicker showTime={{format: "HH:mm"}} format="YYYY-MM-DD HH:mm:ss" onChange={selectTime}/>
                                   {from && to && (
                                    <>
                                         <span>Napok összesen: {totalDays}</span>
                                        <div className="total">
                                            <h1 className="total-title">Teljes összeg: {total} FT</h1>
                                        </div>
                                        <button className="rent-now" onClick={rentNow}>Bérlés most</button>
                                    </>
                                   )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="car-col">
                        <div className="car-image">
                            <img src={car.kep} alt="" className="car-img"></img>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Cars;