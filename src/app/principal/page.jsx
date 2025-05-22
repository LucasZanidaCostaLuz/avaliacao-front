import styles from "./principal.module.css";
import React from "react";
import { Skeleton, Pagination, Modal, Card } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import { UseEffect, UseState }
import Image from "next/image"

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

    useEffect(() => {
        const fetchCandidato = async => {
            try{
                const { data: candidatos } = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/candidatos`, 
                    {
                        headers: HEADERS,
                    }
                )
                setData({ candidatos, loading: false, current: 1, pageSize: 5});
            } catch (error) {
                console.log(error);
                toast.error("Erro ao carregar candidatos");
                setData((d) => ({...d, loading: false }));
            }
        };
        fetchCandidato();
    }, []);
    const openModal = async (candidato) => {
        setModalInfo({ visble: true, candidato, vaga: null, loading: true});
        
        try{
            const { data: vaga } = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/vaga/${candidato.id}`,
                {
                    headers: HEADERS,
                }
            );
            setModalInfo((m) => ({...m, vaga, loading: false}))
        } catch (error){
            console.log(error);
            toast.error("Erro ao carregar candidatos");
            setData((d) => ({...d, loading: false}))
        }
    };
    
    const paginatedCandidatos = () {
        const start = (data.current -1) * data.pageSize;
        return data.candidatos.slice(start, start + data.pageSize)
    };

    return (
        <div>
            <h1>Lista de candidatos</h1>

            <Pagination 
            current={data.current}
            pageSize={data.pageSize}
            total={data.candidatos.length}
            onChange={(page, size) =>
                setData((d) => ({ ...d, current: page, pageSize: size }))
              }
            showSizeChanger
            pageSizeOptions={["5", "10", "50"]}/>
            {data.loading ? (
                <Image
                  src="/images/loading.gif"
                  width={300}
                  height={200}
                  alt="Loading"
                />
              ) : (
                <div className={styles.cardContainer}>
                    {paginatedCandidatos().map((candidato) => (
                        <Card 
                        key={candidato.id}
                        className={style.card}
                        hoverable
                        OnClick={() => openModal(candidato)}
                        cover={
                            <Image 
                            alt={candidato.nome}
                            src={candidato.photo ? aluno.photo : "/images/220.svg"}
                            width={220}
                            height={220}/>
                        }>
                            <Card.Meta title={candidato.nome}> 
                            </Card>
                        </Card>
                    ))} 
                </div>
              )}
              <Modal
              title={`Vaga de ${modalInfo.candidato?.nome}`}
              open={ModalInfo.visible}
              onCancel={() =>}>
                
              </Modal>
        </div>
    )
}