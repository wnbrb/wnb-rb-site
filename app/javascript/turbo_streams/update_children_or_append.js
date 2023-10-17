import { StreamActions } from '@hotwired/turbo';

StreamActions.update_children_or_append = function () {
    function duplicateChildren(existingChildren, newChildrenIds) {
        return existingChildren
            .filter((existingChild) => newChildrenIds.includes(existingChild.id))
            .map((existingChild) => {
                const templateChild = this.templateContent.querySelector(`#${existingChild.id}`);
                return { targetChild: existingChild, templateChild };
            });
    }

    if (this.duplicateChildren.length > 0) {
        const existingChildren = this.targetElements
            .flatMap((e) => [...e.children])
            .filter((c) => !!c.id);

        const newChildrenIds = [...(this.templateContent?.children || [])]
            .filter((c) => !!c.id)
            .map((c) => c.id);

        const duplicatedChildren = duplicateChildren.call(this, existingChildren, newChildrenIds);

        duplicatedChildren.forEach(({ targetChild, templateChild }) => {
            if (targetChild && templateChild) {
                const newElement = templateChild.cloneNode(true);
                templateChild.remove();
                targetChild.replaceWith(newElement);
            }
        });
    } else {
        this.targetElements.forEach((e) => e.append(this.templateContent));
    }
};
