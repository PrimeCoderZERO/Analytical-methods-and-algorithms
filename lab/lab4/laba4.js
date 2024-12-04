class PriorityQueue {
    constructor() {
      this.heap = [];
    }
  
    parent(i) {
      return Math.floor((i - 1) / 2);
    }
  
    leftChild(i) {
      return 2 * i + 1;
    }
  
    rightChild(i) {
      return 2 * i + 2;
    }
  
    swap(i, j) {
      const temp = this.heap[i];
      this.heap[i] = this.heap[j];
      this.heap[j] = temp;
    }
  
    heapifyUp(i) {
      while (i > 0 && this.heap[this.parent(i)] < this.heap[i]) {
        this.swap(i, this.parent(i));
        i = this.parent(i);
      }
    }
  
    heapifyDown(i) {
      let largest = i;
      const left = this.leftChild(i);
      const right = this.rightChild(i);
  
      if (left < this.heap.length && this.heap[left] > this.heap[largest]) {
        largest = left;
      }
  
      if (right < this.heap.length && this.heap[right] > this.heap[largest]) {
        largest = right;
      }
  
      if (largest !== i) {
        this.swap(i, largest);
        this.heapifyDown(largest);
      }
    }
  
    insert(value) {
      this.heap.push(value);
      this.heapifyUp(this.heap.length - 1);
    }
  
    extractMax() {
      if (this.heap.length === 0) return null;
      const max = this.heap[0];
      this.heap[0] = this.heap[this.heap.length - 1];
      this.heap.pop();
      this.heapifyDown(0);
      return max;
    }
  
    peek() {
      return this.heap.length > 0 ? this.heap[0] : null;
    }
  
    size() {
      return this.heap.length;
    }
  }
  function heapSort(arr) {
    const pq = new PriorityQueue();
    
    for (let i = 0; i < arr.length; i++) {
      pq.insert(arr[i]);
    }

    const sortedArray = [];
    while (pq.size() > 0) {
      sortedArray.push(pq.extractMax());
    }
  
    return sortedArray.reverse(); 
  }

  // Приклад запуску
  const pq = new PriorityQueue();
  pq.insert(5);
  pq.insert(3);
  pq.insert(8);
  pq.insert(1);
  
  console.log(pq.extractMax()); // 8
  console.log(pq.peek()); // 5
  
  const arr = [3, 5, 1, 4, 2];
  console.log(heapSort(arr)); // [1, 2, 3, 4, 5]
      