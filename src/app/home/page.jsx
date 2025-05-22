import styles from "./home.module.css";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <Image src="/image/passaros.png" alt="imagem aleatória" width={200} height={200} className={styles.img} priority/>
                <div className={styles.text}>
                    <ul className={styles.list}>
                        <li className={styles.listItens}><span className={styles.span}>Nome:</span> Lucas Zani da Costa Luz</li>
                        <li className={styles.listItens}><span className={styles.span}>Turma:</span> 2TDS1</li>
                        <li className={styles.listItens}><span className={styles.span}>Instrutores:</span> Marcelo e Thiago</li>
                        <li className={styles.listItens}><span className={styles.span}>Atividade:</span> PROVA PRÁTICA-NEXT.JS FRONT END 1</li>
                        <li className={styles.listItens}>Minha API foi criada com o intuito de apresentar os candidatos ou suas vagas, 
                        tendo ambos como entidades. A entidade vagas possui a entidade candidatos, 
                        assim podendo interligar duas ou mais informações entre as entidades</li>
                    </ul>
                </div> 
                <div className={styles.linkCase}>
                    <Link href={"/principal"} prefetch={true} className={styles.link}>Pagina Principal</Link>
                </div>
            </div>
        </div>
    );
}