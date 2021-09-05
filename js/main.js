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
    var { data: decrypted } = await openpgp.decrypt({
        message: encryptedMessage,
        passwords: [document.getElementById('form-access-key').value.trim()],
        format: 'armored'
    });
    decrypted = decrypted.trim();

    const dataUrl = document.getElementById('form-data-url').value.trim();

    document.getElementById('modal-body').innerHTML =
`<pre><code># Download the snapshot with the below command,
az storage copy \\
    --source "${dataUrl}" \\
    --destination . \\
    --recursive \\
    --sas-token "${decrypted}"

# Parameters for QBS (if you are migrating to QBS)
Extract Data URL = ${dataUrl}
SAS Token        = ${decrypted}</code></pre>`;
    modal.toggle();
};

document.getElementById('form-sas-token').addEventListener('blur', formatToken);
document.getElementById('form').addEventListener('submit', decrypt, true);