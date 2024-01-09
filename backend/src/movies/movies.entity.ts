import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Movies{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    title:string;

    @Column()
    genre:string;

    @Column()
    day:string;

    @Column()
    showTime:string;

    @Column()
    imageUrl:string;

    @Column()
    creatorName:string;

}


