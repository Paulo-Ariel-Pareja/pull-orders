import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ database: 'paulo', synchronize: false, name: 'vwtnnotificaciones' })
export class Notificaciones {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'date',
    nullable: true,
  })
  fecha: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  store_id: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
  })
  event: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
  })
  tn_id: string;
}
