window.dom = {
    //创建结点封装
    create(string) {
        //创建template节点能够包含标签中套标签的情况
        const container = document.createElement("template")
            //插入到HTML中并通过trim删除字符串两端空白字符
        container.innerHTML = string.trim()
        return container.content.firstChild
    },

    //在指定节点后面添加一个节点
    after(node, node2) {
        node.parentNode.insertBefore(node2, node.nextSibling)
    },

    //在指定节点前面添加一个节点
    before(node, node2) {
        node.parentNode.insertBefore(node2, node)
    },

    //在父节点里添加一个子节点
    append(parent, node) {
        parent.appendChild(node)
    },

    //添加父节点
    wrap(node, parent) {
        dom.before(node, parent)
        dom.append(parent, node)
    },

    //删除节点
    remove(node) {
        node.parentNode.removeChile(node)
        return node
    },

    //删除节点还删除附属子节点
    empty(node) {
        //等同于const childNodes = node.childNodes
        const { childNodes } = node
        const array = []
        let x = node.firstChild
        while (x) {
            array.push(dom.remove(node.firstChild))
            x = node.firstChild
        }
        return array
    },

    //用于读写属性
    attr(node, name, value) { //重载
        if (arguments.length === 3) {
            node.setAttribute(name, value)
        } else if (arguments.length === 2) {
            return node.getAttribute(name)
        }
    },
    //修改文本内容
    text(node, string) { //适配
        //当传两个参数时，进行改
        if (arguments.length === 2) {
            if ('innerText' in node) {
                //适配ie
                node.innerText = string
            } else {
                //适配其他浏览器
                node.textContent = string
            }
            //传一个参数时进行查
        } else if (arguments.length === 1) {
            if ('innerText' in node) {
                return node.innerText
            } else {
                //适配其他浏览器
                return node.textContent
            }
        }
    },
    //用于读写html属性
    html(node, string) {
        //length ====2 时 修改html属性
        if (arguments.length === 2) {
            node.innerHTML = string
                //length === 1时，查一遍
        } else if (arguments.length === 1) {
            return node.innerHTML
        }
    },
    //用于修改样式
    style(node, name, value) {
        if (arguments.length === 3) {
            //dom.style(div,'color','red')
            node.style[name] = value
        } else if (arguments.length === 2) {
            if (typeof name === 'string') {
                //dom.style(div,'color')
                return node.style[name]
            } else if (name instanceof Object) {
                //dom.style(div,{color:'red'})
                const object = name
                for (let key in object) {
                    node.style[key] = object[key]
                }
            }
        }
    },
    class: {
        //class属性增加
        add(node, className) {
            node.classList.add(className)
        },
        //class删除
        remove(node, className) {
            node.classList.remove(className)

        },
        //class查看属性
        has(node, className) {
            return node.classList.contains(className)
        }
    },
    //用于事件监听
    on(node, eventName, fn) {
        node.addEventListener(eventName, fn)
    },
    //用于删除事件监听
    off(node, eventName, fn) {
        node.removeEventListener(eventName, fn)
    },
    //用于获取标签或标签们  
    find(selector, scope) {
        return (scope || document).querySelectorAll(selector)
    },
    //用于获取父元素
    parent(node) {
        return node.parentNode
    },
    //用于获取子元素
    children(node) {
        return node.children
    },
    //用于获取通级元素
    siblings(node) {
        return Array.from(node.parentNode.children)
            .filter(n => n !== node)
    },
    //用于获取下级元素
    next(node) {
        let x = node.nextSibling
        while (x && x.nodeType === 3) {
            x = x.nextSibling
        }
        return x
    },
    //用于获取上级元素
    previous(node) {
        let x = node.previousSibling
        while (x && x.nodeType === 3) {
            x = x.previousSibling
        }
        return x
    },
    // each(nodeList, fn) {
    //     for (let i = 0; i < nodeList.length; i++) {
    //         fn.call(null, nodeList[i])
    //     }
    // },
    //用于获取遍历所有节点
    each(nodeList, fn) {
        for (let i = 0; i < nodeList.length; i++) {
            fn.call(null, nodeList[i])
        }
    },
    //用于获取节点的下标
    index(node) {
        const list = dom.children(node.parentNode)
        let i
        for (i = 0; i < list.length; i++) {
            if (list[i] === node) {
                break
            }
        }
        return i;
    }
};