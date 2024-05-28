export interface Item {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface Cheque {
  NumCHEQUE: string;
  montant: string;
  date_reception: string;
  CNI: string;
  telephone: string;
  statut: any;
  ville:string;
  banque:string;
  motif:string;
  date_validation: string;

}
export type RoleType = 'admin' | 'SC' | 'DFC' | 'SJN' | 'SJC';
