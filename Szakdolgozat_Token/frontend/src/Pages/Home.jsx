import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Layout from "../Components/Layout";
import { getAllCars } from "../Redux/Actions/Actions";
import { DatePicker } from 'antd';
import { useState } from "react";
import axios from "axios";

const { RangePicker } = DatePicker;

const Home = () => {

    const navigate = useNavigate();


    const {cars} = useSelector(state => state.Reducers);
    const [totalCar, setTotalCar] = useState([]);
    const [category, setCategory] = useState([]);
    const [query, setQuery] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCars());
    }, [dispatch])

    useEffect(() => {
        if(!localStorage.getItem('user')){
            navigate('/login');
        }


        setTotalCar(cars);
    }, [cars, navigate])

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('/api/category');
            console.log(result.data);
            setCategory(result.data);
        }
        fetchData();
    }, [])


    const setFilter = () => {
        var temp = [];

        
        for(var car of cars){

            if(car.foglaltidoszak.length === 0){
                temp.push(car);
            }
        }


        setTotalCar(temp);
    }

    const filterResult = (categoryItem) => {
        const categoryResult = totalCar.filter((currentCategory) => {
            return currentCategory.gyarto === categoryItem;
        });
        setTotalCar(categoryResult);
    }


    const key = ["gyarto"];

    const search = () => {
        return Array.isArray(totalCar) ? (totalCar.filter((item) => key.some((key) => item[key].toLowerCase().includes(query)))) : [];
    };


    return(
        <Layout>
            <div className="slider">
                <div className="left">
                    <h1 className="title">Autó bérlés</h1>
                </div>
                <div className="right">
                    <img src="./images/2023-audi-s7.jpg" alt="" />
                </div>
            </div>
            <div className="content">
                <div className="content-row">
                    <h1 className="big-title">Legjobb bérelhető autók</h1>
                </div>
                <div className="content-flex">
                    <div className="content-row flex-1">
                        <div className="div-filter">
                            <h2 className="car-subtitle">Szűrők</h2>
                            <input type="text" placeholder="Keresés..." onChange={(e) => setQuery(e.target.value)} className="search"/>
                        </div>
                        <div className="div-filter">
                            <RangePicker showTime={{format: "HH:mm"}} format="YYYY-MM-DD HH:mm:ss" onChange={setFilter}/>
                        </div>
                        <div className="div-filter">
                            <div className="filter-btns">
                                <button onClick={() => setTotalCar(cars)} className="btn-type">All</button>
                                {Array.isArray(category) ? (category).map((cat) => (
                                    <button key={cat._id} onClick={() => filterResult(cat.gyarto)} className="btn-type">{cat.gyarto}</button>
                                )): null}
                            </div>
                        </div>
                    </div>
                    <div className="content-row flex-2">
                        <div className="content-groups">
                            {search(totalCar).map((car) => (
                                <div className="card" key={car._id}>
                                    <div className="card-body">
                                        <img src={car.kep} className="img-cars" alt={car.gyarto} />
                                    </div>
                                    <div className="card-footer">
                                        <div className="card-footer-top">
                                            <h3 className="car-title">{car.gyarto} {car.model}</h3>
                                            <p className="per-day">Naponta: <span className="bold-price">{car.osszeg_per_nap} FT</span></p>
                                        </div>
                                        <div className="card-footer-bottom">
                                            <button className="rent-now"><Link to={`/cars/${car._id}`} className="rent-link">Béreld ki most</Link></button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Home;