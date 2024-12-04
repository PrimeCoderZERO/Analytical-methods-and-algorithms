class AVLTree {
    constructor() {
        this.root = null;
    }

    // Визначення вузла дерева
    _Node(key, value) {
        return {
            key,
            value,
            left: null,
            right: null,
            height: 1
        };
    }

    // Висота вузла
    _height(node) {
        return node ? node.height : 0;
    }

    // Оновлення висоти вузла
    _updateHeight(node) {
        node.height = Math.max(this._height(node.left), this._height(node.right)) + 1;
    }

    // Оборот вправо
    _rotateRight(y) {
        let x = y.left;
        let T2 = x.right;

        x.right = y;
        y.left = T2;

        this._updateHeight(y);
        this._updateHeight(x);

        return x;
    }

    // Оборот вліво
    _rotateLeft(x) {
        let y = x.right;
        let T2 = y.left;

        y.left = x;
        x.right = T2;

        this._updateHeight(x);
        this._updateHeight(y);

        return y;
    }

    // Балансування дерева
    _balance(node) {
        let balance = this._height(node.left) - this._height(node.right);

        if (balance > 1) {
            if (this._height(node.left.left) >= this._height(node.left.right)) {
                return this._rotateRight(node);
            } else {
                node.left = this._rotateLeft(node.left);
                return this._rotateRight(node);
            }
        }

        if (balance < -1) {
            if (this._height(node.right.right) >= this._height(node.right.left)) {
                return this._rotateLeft(node);
            } else {
                node.right = this._rotateRight(node.right);
                return this._rotateLeft(node);
            }
        }

        return node;
    }

    // Додавання елемента
    insert(key, value) {
        const insertRec = (node, key, value) => {
            if (node === null) return this._Node(key, value);

            if (key < node.key) {
                node.left = insertRec(node.left, key, value);
            } else if (key > node.key) {
                node.right = insertRec(node.right, key, value);
            } else {
                node.value = value;
                return node;
            }

            this._updateHeight(node);
            return this._balance(node);
        };

        this.root = insertRec(this.root, key, value);
    }

    // Пошук елемента по ключу
    search(key) {
        let node = this.root;

        while (node !== null) {
            if (key === node.key) return node.value;
            if (key < node.key) node = node.left;
            else node = node.right;
        }

        return null;
    }

    // Видалення елемента за ключем
    delete(key) {
        const deleteRec = (node, key) => {
            if (node === null) return node;

            if (key < node.key) {
                node.left = deleteRec(node.left, key);
            } else if (key > node.key) {
                node.right = deleteRec(node.right, key);
            } else {
                if (node.left === null) return node.right;
                else if (node.right === null) return node.left;

                node.key = this._minNode(node.right).key;
                node.value = this._minNode(node.right).value;
                node.right = deleteRec(node.right, node.key);
            }

            this._updateHeight(node);
            return this._balance(node);
        };

        this.root = deleteRec(this.root, key);
    }

    // Пошук мінімального ключа
    _minNode(node) {
        let current = node;
        while (current.left !== null) {
            current = current.left;
        }
        return current;
    }

    // Пошук максимального ключа
    _maxNode(node) {
        let current = node;
        while (current.right !== null) {
            current = current.right;
        }
        return current;
    }

    // Обхід в глибину 
    inOrder() {
        const result = [];
        const inOrderRec = (node) => {
            if (node !== null) {
                inOrderRec(node.left);
                result.push({ key: node.key, value: node.value });
                inOrderRec(node.right);
            }
        };

        inOrderRec(this.root);
        return result;
    }

    // Обхід в ширину 
    levelOrder() {
        if (this.root === null) return [];

        const result = [];
        const queue = [this.root];

        while (queue.length > 0) {
            let node = queue.shift();
            result.push({ key: node.key, value: node.value });

            if (node.left !== null) queue.push(node.left);
            if (node.right !== null) queue.push(node.right);
        }

        return result;
    }
}

// Запуск
let map = new AVLTree();
map.insert(10, "Value1");
map.insert(20, "Value2");
map.insert(30, "Value3");
map.insert(5, "Value4");

console.log("Search 20: ", map.search(20));
console.log("In-order traversal: ", map.inOrder());
console.log("Level-order traversal: ", map.levelOrder());

map.delete(20);
console.log("After deletion of 20:");
console.log("In-order traversal: ", map.inOrder());
