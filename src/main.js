const div = dom.create("<div><span>使用create创建的第一个标签节点</span></div>");
console.log(div);

const after = dom.create("<div><span>用after插入的测试</span></div>");
dom.after(test, after);

const before = dom.create("<div><span>用before插入的测试</span></div>");
dom.before(test, before);



dom.after(test, div);
const div3 = dom.create('<div id="parent"></div>')
dom.wrap(test, div3)

dom.attr(test, 'title', 'HI 我是老八')
const title = dom.attr(test, 'title');
console.log(`title ${title}`);


dom.text(test, '你好，这是新内容')

dom.style(test, { border: '1px solid red', color: 'blue' })
console.log(dom.style(test, 'border'))
dom.style(test, 'border', '1px solid black')

dom.class.add(test, 'red')
dom.class.remove(test, 'red')
console.log(dom.class.has(test, 'blue'))

const fn = () => {
    console.log('点击了')
}
dom.on(test, 'click', fn)
dom.off(test, 'click', fn)

const testDiv = dom.find('#test')[0]
console.log(testDiv)
console.log(dom.parent(test))

// const t = dom.find('#travel')[0]
// dom.each(dom.children(t), (t) => dom.style(t, 'color', 'red'))
const t = dom.find('#travel')[0]
dom.each(dom.children(t), (n) => dom.style(n, 'color', 'red'))

console.log(dom.index(s3));