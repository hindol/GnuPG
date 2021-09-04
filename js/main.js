const decrypt = async (e) => {
    e.preventDefault();

    const encryptedMessage = await openpgp.readMessage({
        armoredMessage: document.getElementById('form-sas-token').value
    });
    const { data: decrypted } = await openpgp.decrypt({
        message: encryptedMessage,
        passwords: [document.getElementById('form-access-key').value],
        format: 'armored'
    });

    document.getElementById('modal-body').innerHTML = decrypted;

    const modal = new bootstrap.Modal(document.getElementById('decrypted-token'), {});
    modal.toggle();
};

const closeModal = async (e) => {
    const modal = new bootstrap.Modal(document.getElementById('decrypted-token'), {});
    modal.hide();
};

document.getElementById('form').addEventListener('submit', decrypt, true);

document.getElementById('modal-close').addEventListener('click', closeModal);