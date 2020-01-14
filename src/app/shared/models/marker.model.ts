export class Marker{

    title:string;
    description:string;
    img:string;
    lng:number;
    lat:number;

    constructor(lng:number, lat:number){
        this.title = 'Sin Título';
        this.description = 'Sin Despcripción';
        this.img = '';
        this.lng = lng;
        this.lat = lat;
    }
}