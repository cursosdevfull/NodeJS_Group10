// Domain
class Medic {
  /*     nombre = "sergio"
        apellido = "hidalgo"
        readonly nombreCompleto = this.nombre + " " + this.apellido
        private readonly middleName = "Iván" */

  constructor(
    public name: string,
    public lastname: string,
    public cmp: number
  ) {}
  /*  name: string
        lastname: string
        cmp: number
    
        constructor(name: string, lastname: string, cmp: number) {
            this.name = name
            this.lastname = lastname
            this.cmp = cmp
        } */

  /*     name!: string
            lastname!: string
            cmp!: number */

  /*     constructor() {
                this.name = "Sergio"
                this.lastname = "Hidalgo"
                this.cmp = 25456
            } */

  /*     constructor(medicName: string, lastname: string, cmp: number) {
                this.name = medicName
                this.lastname = lastname
                this.cmp = cmp
            } */
  /* 
            constructor() {
                this.init()
            } */

  /*     init() {
                this.name = "Sergio"
                this.lastname = "Hidalgo"
                this.cmp = 25456
            } */
}

interface MedicRepository {
  insert(medic: Medic): Medic;
}

// Application
class MedicApplication {
  constructor(private infrastructure: MedicRepository) {}
  insert(medic: Medic) {
    const insertedMedic = this.infrastructure.insert(medic);
    return insertedMedic;
    /* lógica antes de insertar */

    //const infrastructure = new MedicInfrastructure()
    // const insertedMedic = this.infrastructure.insert(medic)
    /*  const isValid = this.infrastructure.validation(medic)
    
            if(isValid) {
                const status = this.infrastructure.validationNationality(medic)
                const insertedMedic = this.infrastructure.insert(medic)
            }
    
            return null */
  }
}

// Infrastructure
class MedicInfrastructure implements MedicRepository {
  insert(medic: Medic) {
    /* proceso para insertar */
    // this.validation(medic)
    this.validation(medic);
    this.validationNationality(medic);
    return medic;
  }

  validation(medic: Medic) {
    return true;
  }

  validationNationality(medic: Medic) {
    return "no need additional information";
  }
}

const medic: Medic = new Medic("Sergio", "Hidalgo", 24567);
const infrastructure: MedicRepository = new MedicInfrastructure();
const application: MedicApplication = new MedicApplication(infrastructure);
application.insert(medic);
