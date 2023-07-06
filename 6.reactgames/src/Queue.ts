class Queue<T> {
  arr: T[];

  constructor() {
    this.arr = [];
  }

  enqueue(item: T) {
    this.arr.push(item);
  }

  dequeue() {
    const res = this.arr.shift();
    if (res) {
      return res;
    }
    throw new Error('Queue is empty');
  }

  isEmpty() {
    return this.arr.length === 0;
  }
}

export default Queue;
