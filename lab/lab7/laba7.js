class HashMap {
    constructor() {
      this.table = [];
      this.size = 0;
      this.capacity = 16; // початкова ємність
    }
  
    hash(key) {
      return key.toString().split('').reduce((hash, char) => hash + char.charCodeAt(0), 0) % this.capacity;
    }
  
    add(key, value) {
      const index = this.hash(key);
      
      if (this.size / this.capacity >= 0.7) {
        this.rehash();
      }
  
      if (this.size % 2 === 0) {
        this.chainingMethod(index, key, value);
      } else {
        this.openAddressingMethod(index, key, value);
      }
      this.size++;
    }
  
    chainingMethod(index, key, value) {
      if (!this.table[index]) {
        this.table[index] = [];
      }
      this.table[index].push({ key, value });
    }
  
    openAddressingMethod(index, key, value) {
      let i = 0;
      let newIndex = (index + i * i) % this.capacity; // квадратичне пробірування
      while (this.table[newIndex] && this.table[newIndex].key !== key) {
        i++;
        newIndex = (index + i * i) % this.capacity;
      }
      this.table[newIndex] = { key, value };
    }
  
    get(key) {
      const index = this.hash(key);
      if (this.size % 2 === 0) {
        return this.chainingSearch(index, key);
      } else {
        return this.openAddressingSearch(index, key);
      }
    }
  
    chainingSearch(index, key) {
      if (!this.table[index]) return null;
      const bucket = this.table[index];
      for (const item of bucket) {
        if (item.key === key) {
          return item.value;
        }
      }
      return null;
    }
  
    openAddressingSearch(index, key) {
      let i = 0;
      let newIndex = (index + i * i) % this.capacity;
      while (this.table[newIndex] && this.table[newIndex].key !== key) {
        i++;
        newIndex = (index + i * i) % this.capacity;
      }
      return this.table[newIndex] ? this.table[newIndex].value : null;
    }
  
    remove(key) {
      const index = this.hash(key);
      if (this.size % 2 === 0) {
        this.chainingRemove(index, key);
      } else {
        this.openAddressingRemove(index, key);
      }
      this.size--;
    }
  
    chainingRemove(index, key) {
      const bucket = this.table[index];
      if (bucket) {
        const itemIndex = bucket.findIndex(item => item.key === key);
        if (itemIndex !== -1) {
          bucket.splice(itemIndex, 1);
        }
      }
    }
  
    openAddressingRemove(index, key) {
      let i = 0;
      let newIndex = (index + i * i) % this.capacity;
      while (this.table[newIndex] && this.table[newIndex].key !== key) {
        i++;
        newIndex = (index + i * i) % this.capacity;
      }
      if (this.table[newIndex]) {
        this.table[newIndex] = undefined;
      }
    }
  
    rehash() {
      this.capacity *= 2;
      const oldTable = this.table;
      this.table = [];
      this.size = 0;
      for (const item of oldTable) {
        if (item) {
          if (Array.isArray(item)) {
            for (const subItem of item) {
              this.add(subItem.key, subItem.value);
            }
          } else {
            this.add(item.key, item.value);
          }
        }
      }
    }
  }

// test
let map = new HashMap();
map.add('apple', 1);
map.add('banana', 2);
console.log(map.get('apple'));  // 1
map.remove('apple');
console.log(map.get('apple'));  // null
