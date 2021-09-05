const modal = new bootstrap.Modal(document.getElementById('decrypted-token'), {});

const formatToken = async (e) => {
    const value = e.target.value;

    if (value) {
        e.target.value = value.trim().replaceAll('\n\n', '\n').replace('\n', '\n\n');
    }
}

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
    modal.toggle();
};

document.getElementById('form-sas-token').addEventListener('blur', formatToken);
document.getElementById('form').addEventListener('submit', decrypt, true);