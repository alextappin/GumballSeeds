/**
 * Created by t_tappa on 10/1/2015.
 */
function ContainerHelper() {
    return {
        newContainer : function newContainer(backgroundColor) {
            //ternary
            return (backgroundColor) ? new PIXI.Container(backgroundColor)
                : new PIXI.Container(0x123456);
        },
        addChildren : function addChildren(container, children) {
            //this allows the user to send in any number of arguments to be added.
            //The first will be the container to add the children to.
            //The arguments are there to help with intellisence
            var container = arguments[0],
                index;

            for (index = 1; index < arguments.length; index++) {
                container.addChild(arguments[index]);
            }
            return container;
        }
    }
}