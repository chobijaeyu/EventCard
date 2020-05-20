class Item<T> {
    val: T
    prev: Item<T>
    next: Item<T>
    constructor(val: T) {
        this.val = val
        this.prev = undefined
        this.next = undefined
    }
}

export default class LinkedList<T> {
    private size: number
    private head: Item<T>
    private tail: Item<T>
    constructor() {
        this.size = 0
        this.head = this.tail = undefined
    }
    push(val: T): void {
        const node = new Item(val)
        if (this.size === 0) {
            this.head = this.tail = node
        } else {
            this.tail.next = node
            node.prev = this.tail
            this.tail = node
        }
        this.size++
    }
    pop(): T {
        this.size--
        const ret: Item<T> = this.tail
        if (this.size > 0) {
            this.tail = this.tail.prev
            this.tail.next = undefined
        } else {
            this.headAndTailResetToNull()
        }
        return ret.val
    }

    shift(): T {
        this.size--
        const ret: Item<T> = this.head
        if (this.size > 0) {
            this.head = this.head.next
            this.head.prev = undefined
        } else {
            this.headAndTailResetToNull()
        }
        return ret.val
    }

    unshift(val: T): void {
        const node = new Item(val)
        if (this.size === 0) {
            this.head = this.tail = node
        } else {
            this.head.prev = node
            node.next = this.head
            this.head = node
        }
        this.size++
    }

    count(): number {
        return this.size
    }

    delete(val: T): void {
        let tempNode = this.head
        while (tempNode.val !== val) {
            tempNode = tempNode.next
            if (tempNode === undefined) {
                return
            }
        }
        if (this.size === 1) {
            this.headAndTailResetToNull()
        } else if (tempNode === this.head) {
            this.shift()
        } else if (tempNode === this.tail) {
            this.pop()
        } else {
            tempNode.prev.next = tempNode.next
            tempNode.next.prev = tempNode.prev
        }
        this.size--
    }

    headAndTailResetToNull(): void {
        this.head = this.tail = undefined
    }
}