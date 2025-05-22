import {Card, Pagination, Modal} from "antd";
import React from "react";
import styles from "../styles/card.module.css"
import axios from "axios";
import { useEffect } from "react";
import Image from "next/image";
import { toast } from "react-toastify";

const HEADERS = { "x-api-key": process.env.NEXT_PUBLIC_API_KEY };

export default function Cards ({onClick}){
    const [data, setData] = useState({
        candidatos: [],
        loading: true,
        current: 1,
        pageSize: 0,
    });

    useEffect(() => {
        const fetchAlunos = async () => {
            try{
                const {data: candidatos} = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/candidatos`,
                    {
                        headers: HEADERS,
                    }
                )
                setData({candidatos, loading: false, current: 1, pageSize: 5});
            } catch{
            toast.error("Erro ao carregar alunos");
            setData((d) => ({...d, loading: false}));
            }
        };

        fetchAlunos();
    }, []);

    const paginatedCandidatos = () => {
        const start = (data.current)* data.pageSize
        return data.candidatos.slice(start, start + data.pageSize)
    }


    
    return(
        <div>
            <Pagination 
            current={data.current}
            pageSize={data.pageSize}
            total={data.candidatos.length}
            onChange={(page, size) => setData((d) => ({...d, current: page, pageSize: size}))}
            showSizeChanger
            pageSizeOptions={["5", "10", "20"]}/>

            {data.loading ? (
                <Image src="/image/loading.gif"
                 width={200} 
                 height={200} 
                 alt="loading" />
            ) : (
                <div className={styles.cardsContainer}>
                    {paginatedCandidatos().map((candidato) => (
                        <Card 
                        key={candidato.id}
                        className={styles.card}
                        hoverable
                        onClick={() => {onClick}}
                        cover={
                            <Image 
                            alt={candidato.nome}
                            src={candidato.photo ? candidato.photo : "/image/220.svg"}
                            width={220}
                            height={220}/>
                        } >
                            <Card.Meta 
                            title={candidato.nome}/> 
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}