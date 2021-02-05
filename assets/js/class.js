// @ts-nocheck
//@ts-check

class President {
    firstName;
    lastName;
    born;
    death;
    tips;
    /**
     *
     * @param {string} firstName
     * @param {string} lastName
     * @param {Date} born
     * @param {Date} death
     * @param {string} tips
     */
    constructor(firstName, lastName, born, death, tips) {
            this.setFirstName(firstName);
            this.setLastName(lastName);
            this.setBorn(born);
            this.setDeath(death);
            this.setTips(tips);
        }
        //Define Setters
    setFirstName(firstName) {
        if (typeof(firstName) === 'string' && firstName !== '') {
            this.firstName = firstName;
        } else {
            throw new Error("Le nom doit être une string");
        }
    }
    setLastName(lastName) {
        if (typeof(lastName) === 'string' && lastName !== '') {
            this.lastName = lastName;
        } else {
            throw new Error("Le nom doit être une string");
        }
    }
    setBorn(born) {
        if (new Date(born) && born !== "") {
            this.born = born;

        } else {
            throw new Error("Le format date n'est pas correct!");
        }
    }
    setDeath(death) {
        if (new Date(death) && death !== "") {
            this.death = death;

        } else {
            throw new Error("Le format date n'est pas correct!");
        }
    }
    setTips(tips) {
            if (typeof(tips) === 'string' && tips !== '') {
                this.tips = tips;
            } else {
                throw new Error("L'astuce doit être une string");
            }
        }
        //Define Getters
    getFirstName() {
        return this.firstName;
    }
    getLastName() {
        return this.lastName;
    }
    getBorn() {
        return this.born;
    }
    getDeath() {
        return this.death;
    }
    getTips() {
        return this.tips;
    }
    render() {
        let pdt = `Le président ${this.firstName} ${this.lastName} est né le ${this.born} et mort le ${this.death}.
    La petite histoire : ${this.tips} `;
        return pdt;
    }
}
let birthDate = new Date('April 14, 1797').toLocaleString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
});

let deathDate = new Date('September 3, 1877').toLocaleString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
});

