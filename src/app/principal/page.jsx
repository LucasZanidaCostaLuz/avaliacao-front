import styles from "./principal.module.css";
import React from "react";
import { Skeleton, Pagination, Modal } from "antd";
import Cards from "@/components/Cards";
import axios from "axios";
import { toast } from "react-toastify";

const HEADERS = { "x-api-key": process.env.NEXT_PUBLIC_API_KEY };

export default function Principal () {
    const [data, setData] = useState({
    candidatos: [],
    loading: true,
    current: 1,
    pageSize: 0,
  });

  const [modalInfo, setModalInfo] = useState({
    visible: false,
    candidato: null,
    vaga: null,
    loading: false,
  });

  const openModal = async (candidato) => {
    setModalInfo({ visible: true, candidato, vaga: null, loading: true});
    
    const cacheKey = `vaga_${candidato.id}`;

    try{
        const { data: vaga } = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/vaga/${candidato.id}`,
            {
                headers: HEADERS,
            }
        );
        setModalInfo((m) => ({...m, vaga, loading: false }));
    }catch{
        toast.error("Erro ao carregar avaliação.");
        setModalInfo((m) => ({ ...m, loading: false }))
    }
}
    return (
        
    )
}