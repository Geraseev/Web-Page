let ids = 0;
let mais = [];

module.exports = {
    new(name) {
        let extra = {id: ++ids, name: name};
        mais.push(extra);
        return extra;
    },
    list() {
        return mais;
    },
    getElementById(id) {
        let pos = this.getPositionById(id)
        if (pos >= 0) {
            return mais[pos];
        }
        return null;
    },
    getPositionById(id) {
        for (let i = 0; i<mais.length; i++) {
            if (mais[i].id == id) {
                return i;
            }
        }
        return -1;
    }
}