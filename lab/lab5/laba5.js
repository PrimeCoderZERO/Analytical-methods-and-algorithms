class TreeNode {
    constructor(key, value) {
      this.key = key;
      this.value = value;
      this.left = null;
      this.right = null;
    }
  }
  
  class AssociativeArray {
    constructor() {
      this.root = null;
    }
  
    insert(key, value) {
      const newNode = new TreeNode(key, value);
      if (!this.root) {
        this.root = newNode;
        return;
      }
  
      let current = this.root;
      while (true) {
        if (key < current.key) {
          if (!current.left) {
            current.left = newNode;
            return;
          }
          current = current.left;
        } else if (key > current.key) {
          if (!current.right) {
            current.right = newNode;
            return;
          }
          current = current.right;
        } else {
          current.value = value;
          return;
        }
      }
    }
  
    search(key) {
      let current = this.root;
      while (current) {
        if (key === current.key) {
          return current.value;
        } else if (key < current.key) {
          current = current.left;
        } else {
          current = current.right;
        }
      }
      return null;
    }
  
    delete(key) {
      this.root = this._deleteNode(this.root, key);
    }
  
    _deleteNode(node, key) {
      if (!node) return null;
  
      if (key < node.key) {
        node.left = this._deleteNode(node.left, key);
      } else if (key > node.key) {
        node.right = this._deleteNode(node.right, key);
      } else {
        if (!node.left) return node.right;
        if (!node.right) return node.left;
  
        node.key = this._minValue(node.right).key;
        node.right = this._deleteNode(node.right, node.key);
      }
      return node;
    }
  
    _minValue(node) {
      let current = node;
      while (current.left) {
        current = current.left;
      }
      return current;
    }
  
    max() {
      let current = this.root;
      while (current && current.right) {
        current = current.right;
      }
      return current ? current.key : null;
    }
  
    min() {
      let current = this.root;
      while (current && current.left) {
        current = current.left;
      }
      return current ? current.key : null;
    }
  
    inOrderTraversal(node = this.root, result = []) {
      if (node) {
        this.inOrderTraversal(node.left, result);
        result.push({ key: node.key, value: node.value });
        this.inOrderTraversal(node.right, result);
      }
      return result;
    }
  
    breadthFirstTraversal() {
      const result = [];
      if (!this.root) return result;
  
      const queue = [this.root];
      while (queue.length > 0) {
        const node = queue.shift();
        result.push({ key: node.key, value: node.value });
  
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
      }
      return result;
    }
  }
  
  // Тестування
  const associativeArray = new AssociativeArray();
  associativeArray.insert(50, 'Value 50');
  associativeArray.insert(30, 'Value 30');
  associativeArray.insert(70, 'Value 70');
  associativeArray.insert(20, 'Value 20');
  associativeArray.insert(40, 'Value 40');
  associativeArray.insert(60, 'Value 60');
  associativeArray.insert(80, 'Value 80');
  
  console.log(associativeArray.search(30));  // Виведе: 'Value 30'
  console.log(associativeArray.min());      // Виведе: 20
  console.log(associativeArray.max());      // Виведе: 80
  
  associativeArray.delete(30);
  console.log(associativeArray.search(30));  // Виведе: null
  
  console.log(associativeArray.inOrderTraversal());  // Виведе: всі елементи дерева в порядку зростання
  console.log(associativeArray.breadthFirstTraversal());  // Виведе: елементи дерева в порядку рівнів
  