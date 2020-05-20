export class Queue<T>{
    _queue: T[];

    constructor(queue?: T[]) {
        this._queue = queue || [];
    }

    enqueue(item: T) {
        this._queue.push(item);
    }

    dequeue(): T {
        return this._queue.shift();
    }

    join(item: T) {
        this._queue.unshift(item)
    }

    out(): T {
        return this._queue.pop()
    }

    clear() {
        this._queue = [];
    }

    get count(): number {
        return this._queue.length;
    }
}
