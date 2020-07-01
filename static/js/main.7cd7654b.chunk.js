(this["webpackJsonptodolist-ts"]=this["webpackJsonptodolist-ts"]||[]).push([[0],{61:function(e,t,n){e.exports=n(73)},66:function(e,t,n){},72:function(e,t,n){},73:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),r=n(7),o=n.n(r);n(66),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var c=n(27),l=(n(72),n(28)),u=n(113),d=n(103),s=n(104);function f(e){var t=Object(a.useState)(""),n=Object(l.a)(t,2),r=n[0],o=n[1],c=Object(a.useState)(null),f=Object(l.a)(c,2),m=f[0],E=f[1],v=function(){var t=r.trim();t?e.addItem(t):E("Title is required!"),o("")};return i.a.createElement("div",null,i.a.createElement(u.a,{variant:"outlined",value:r,onChange:function(e){E(null),o(e.currentTarget.value)},onKeyPress:function(e){13===e.charCode&&v()},error:!!m,label:"Title",helperText:m}),i.a.createElement(d.a,{color:"primary",onClick:v},i.a.createElement(s.a,null)))}var m=function(e){var t=Object(a.useState)(!1),n=Object(l.a)(t,2),r=n[0],o=n[1],c=Object(a.useState)(e.value),d=Object(l.a)(c,2),s=d[0],f=d[1];return r?i.a.createElement(u.a,{variant:"outlined",value:s,autoFocus:!0,onBlur:function(){o(!1),e.onChange(s)},onChange:function(e){f(e.currentTarget.value)}}):i.a.createElement("span",{onDoubleClick:function(){o(!0),f(e.value)}},e.value)},E=n(114),v=n(106),T=n(105),O=function(e){return i.a.createElement("div",null,i.a.createElement("h3",null,i.a.createElement(m,{value:e.title,onChange:function(t){e.changeTodoListTitle(e.id,t)}}),i.a.createElement(d.a,{onClick:function(){e.removeTodoList(e.id)}},i.a.createElement(T.a,null))),i.a.createElement(f,{addItem:function(t){e.addTask(t,e.id)}}),i.a.createElement("div",null,e.tasks.map((function(t){return i.a.createElement("div",{className:!0===t.isDone?"is-done":"",key:t.id},i.a.createElement(E.a,{onChange:function(n){e.changeStatus(t.id,n.currentTarget.checked,e.id)},color:"primary",checked:t.isDone}),i.a.createElement(m,{value:t.title,onChange:function(n){e.changeTitle(t.id,n,e.id)}}),i.a.createElement(d.a,{onClick:function(){return e.removeTask(t.id,e.id)}},i.a.createElement(T.a,null)))}))),i.a.createElement("div",null,i.a.createElement(v.a,{variant:"all"===e.filter?"outlined":"text",onClick:function(){e.changeFilter("all",e.id)},color:"default"},"All"),i.a.createElement(v.a,{variant:"active"===e.filter?"outlined":"text",onClick:function(){e.changeFilter("active",e.id)},color:"primary"},"Active"),i.a.createElement(v.a,{variant:"completed"===e.filter?"outlined":"text",onClick:function(){e.changeFilter("completed",e.id)},color:"secondary"},"Completed")))},h=n(107),I=n(108),p=n(110),g=n(111),b=n(112),k=n(74),D=n(109),S=n(29),A=n(115),j=[],C=n(22),y={};var L=function(){var e=Object(c.c)((function(e){return e.todolists})),t=Object(c.c)((function(e){return e.tasks})),n=Object(c.b)();function a(e,t){var a={type:"REMOVE-TASK",taskId:e,todolistId:t};n(a)}function r(e,t){var a=function(e,t){return{type:"ADD-TASK",title:e,todolistId:t}}(e,t);n(a)}function o(e,t,a){var i=function(e,t,n){return{type:"CHANGE-TASK-STATUS",taskId:e,isDone:t,todolistId:n}}(e,t,a);n(i)}function l(e,t,a){var i=function(e,t,n){return{type:"CHANGE-TASK-TITLE",taskId:e,title:t,todolistId:n}}(e,t,a);n(i)}function u(e){var t={type:"REMOVE-TODOLIST",id:e};n(t)}function s(e,t){var a=function(e,t){return{type:"CHANGE-TODOLIST-TITLE",id:e,title:t}}(e,t);n(a)}function m(e,t){var a={type:"CHANGE-TODOLIST-FILTER",filter:e,id:t};n(a)}return i.a.createElement("div",{className:"App"},i.a.createElement(h.a,{position:"static"},i.a.createElement(I.a,null,i.a.createElement(d.a,{edge:"start",color:"inherit","aria-label":"menu"},i.a.createElement(D.a,null)),i.a.createElement(p.a,{variant:"h6"},"News"),i.a.createElement(v.a,{color:"inherit"},"Login"))),i.a.createElement(g.a,{fixed:!0},i.a.createElement(b.a,{container:!0,style:{padding:"20px"}},i.a.createElement(f,{addItem:function(e){var t=function(e){return{type:"ADD-TODOLIST",title:e,todolistId:Object(A.a)()}}(e);n(t)}})),i.a.createElement(b.a,{container:!0,spacing:3},e.map((function(n){var c=t[n.id];return"active"===n.filter&&(c=c.filter((function(e){return!1===e.isDone}))),"completed"===n.filter&&(c=c.filter((function(e){return!0===e.isDone}))),i.a.createElement(b.a,{key:n.id,item:!0},i.a.createElement(k.a,{style:{padding:"10px"}},i.a.createElement(O,{id:n.id,key:n.id,title:n.title,tasks:c,removeTask:a,filter:n.filter,changeFilter:m,addTask:r,changeStatus:o,removeTodoList:u,todoLists:e,changeTitle:l,changeTodoListTitle:s})))})))))},w=n(31),N=Object(w.b)({tasks:function(){var e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:y,n=arguments.length>1?arguments[1]:void 0;switch(n.type){case"REMOVE-TASK":return(e=Object(C.a)({},t))[n.todolistId]=e[n.todolistId].filter((function(e){return e.id!==n.taskId})),e;case"ADD-TASK":e=Object(C.a)({},t);var a={id:Object(A.a)(),title:n.title,isDone:!1};return e[n.todolistId]=[a].concat(Object(S.a)(e[n.todolistId])),e;case"CHANGE-TASK-STATUS":e=Object(C.a)({},t);var i=t[n.todolistId],r=i.find((function(e){return e.id===n.taskId}));return r&&(r.isDone=n.isDone),e;case"CHANGE-TASK-TITLE":e=Object(C.a)({},t);var o=t[n.todolistId],c=o.find((function(e){return e.id===n.taskId}));return c&&(c.title=n.title),e;case"ADD-TODOLIST":return(e=Object(C.a)({},t))[n.todolistId]=[],e;case"REMOVE-TODOLIST":return delete(e=Object(C.a)({},t))[n.id],e;default:return t}},todolists:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:j,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"REMOVE-TODOLIST":return e.filter((function(e){return e.id!==t.id}));case"ADD-TODOLIST":var n={id:t.todolistId,title:t.title,filter:"all"};return[].concat(Object(S.a)(e),[n]);case"CHANGE-TODOLIST-FILTER":var a=e.find((function(e){return e.id===t.id}));return a?(a.filter=t.filter,Object(S.a)(e)):e;case"CHANGE-TODOLIST-TITLE":var i=e.find((function(e){return e.id===t.id}));return i?(i.title=t.title,Object(S.a)(e)):e;default:return e}}}),K=Object(w.c)(N);window.store=K,o.a.render(i.a.createElement(c.a,{store:K},i.a.createElement(L,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[61,1,2]]]);
//# sourceMappingURL=main.7cd7654b.chunk.js.map