let ids = 0;
let infos = [];

module.exports = {
    new(name) {
        let info = {id: ++ids, name: name};
        infos.push(info);
        return info;
    },
    update (id, name) {
        let pos = this.getPositionById(id)
        if (pos >= 0) {
            infos[pos].name = name;
        }
    },
    list() {
        return infos;
    },
    getElementById(id) {
        let pos = this.getPositionById(id)
        if (pos >= 0) {
            return infos[pos];
        }
        return null;
    },
    getPositionById(id) {
        for (let i = 0; i<infos.length; i++) {
            if (infos[i].id == id) {
                return i;
            }
        }
        return -1;
    },
    delete(id) {
        let i = this.getPositionById(id);
        if (i >= 0) {
            infos.splice(i, 1);
            return true;
        }
        return false; 
    }
}