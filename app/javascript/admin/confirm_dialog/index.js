import { Turbo } from '@hotwired/turbo-rails';

function buildDialog() {
    const dialog = document.createElement('dialog');

    Object.assign(dialog.style, {
        maxWidth: '400px',
        width: '90%',
        padding: '24px',
        border: '1px solid #dee2e6',
        borderRadius: '8px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
    });

    const message = document.createElement('p');
    message.style.cssText = 'margin: 0 0 24px; font-size: 16px; color: #212529;';
    dialog.appendChild(message);

    const actions = document.createElement('div');
    actions.style.cssText = 'display: flex; justify-content: flex-end; gap: 8px;';

    const cancelButton = document.createElement('button');
    cancelButton.type = 'button';
    cancelButton.textContent = 'Cancel';
    Object.assign(cancelButton.style, {
        padding: '6px 12px',
        border: '1px solid #6c757d',
        borderRadius: '6px',
        background: 'transparent',
        cursor: 'pointer',
    });

    const confirmButton = document.createElement('button');
    confirmButton.type = 'button';
    confirmButton.textContent = 'Yes, delete';
    Object.assign(confirmButton.style, {
        padding: '6px 12px',
        border: 'none',
        borderRadius: '6px',
        background: '#dc3545',
        color: '#fff',
        cursor: 'pointer',
    });

    actions.appendChild(cancelButton);
    actions.appendChild(confirmButton);
    dialog.appendChild(actions);

    return { dialog, message, confirmButton, cancelButton };
}

Turbo.config.forms.confirm = function confirmMessage(text) {
    return new Promise((resolve) => {
        const { dialog, message, confirmButton, cancelButton } = buildDialog();
        message.textContent = text;
        document.body.appendChild(dialog);

        dialog.addEventListener(
            'close',
            () => {
                resolve(dialog.returnValue === 'confirm');
                dialog.remove();
            },
            { once: true },
        );
        confirmButton.addEventListener('click', () => dialog.close('confirm'), { once: true });
        cancelButton.addEventListener('click', () => dialog.close('cancel'), { once: true });

        dialog.showModal();
    });
};
