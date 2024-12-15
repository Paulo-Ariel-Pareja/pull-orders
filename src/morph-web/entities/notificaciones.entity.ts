import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ synchronize: false, name: 'tnnotificaciones' })
export class Notificaciones {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'varchar',
    length: 13,
    nullable: false,
  })
  orden: string;

  @Column({
    type: 'date',
    nullable: true,
  })
  fecha: string;
}
