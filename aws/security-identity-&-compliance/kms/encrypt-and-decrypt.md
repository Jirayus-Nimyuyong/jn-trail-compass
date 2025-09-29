How does KMS work?
API – Encrypt and Decrypt

---
Envelope Encryption

• KMS Encrypt API call has a limit of 4 KB
• If you want to encrypt >4 KB, we need to use Envelope Encryption
• The main API that will help us is the GenerateDataKey API
• For the exam: anything over 4 KB of data that needs to be encrypted
must use the Envelope Encryption == GenerateDataKey API

---

Deep dive into Envelope Encryption
GenerateDataKey API

Decrypt envelope data

---

Encryption SDK – diagram
• The SDK encrypts the data encryption key and stores it (encrypted) as
part of the returned ciphertext.

---

KMS Symmetric – API Summary
• Encrypt: encrypt up to 4 KB of data through KMS
• GenerateDataKey: generates a unique symmetric data key (DEK)
• returns a plaintext copy of the data key
• AND a copy that is encrypted under the CMK that you specify
• GenerateDataKeyWithoutPlaintext:
• Generate a DEK to use at some point (not immediately)
• DEK that is encrypted under the CMK that you specify (must use Decrypt later)
• Decrypt: decrypt up to 4 KB of data (including Data Encryption Keys)
• GenerateRandom: Returns a random byte string

---

KMS Encryption Patterns and Envelope Encryption
Introduction to KMS Encryption and Decryption APIs
Let's take a deep dive into how AWS Key Management Service (KMS) works for the encrypt and decrypt APIs, as well as for envelope encryption.

We start with a secret, for example, a password, which must be less than four kilobytes due to KMS limits. We send this secret to the KMS service using the encrypt API via an SDK or the CLI. We specify the Customer Master Key (CMK) we want to use in KMS. KMS then checks with IAM to verify if we have the right permissions. If authorized, KMS performs the encryption and returns the entirely encrypted secret, which is the encrypted data.

To decrypt, we use the CLI or SDK to call the decrypt API. KMS automatically determines which CMK was used for encryption and uses it to perform decryption. It first checks with IAM to ensure we have the correct permissions to decrypt. If authorized, KMS returns the decrypted secret in plain-text.

These encrypt and decrypt APIs are straightforward but have a limitation: the secret size is limited to four kilobytes. To encrypt data larger than four kilobytes, we use a technique called envelope encryption.

Envelope Encryption and the GenerateDataKey API
For encrypting large amounts of data, such as files up to 10 megabytes or more, we use the GenerateDataKey API. This API is essential for envelope encryption and is a key concept for the exam.

When we call the GenerateDataKey API specifying a CMK, KMS checks IAM permissions to confirm we can generate a data key. If authorized, KMS generates a data encryption key (DEK) and returns two versions: a plain-text DEK and an encrypted DEK.

We use the plain-text DEK client-side to encrypt the large file using our own CPU. This produces an encrypted file. Then, we build an envelope around this encrypted file, which includes the encrypted DEK. This combined file is the final encrypted output.

This is why the technique is called envelope encryption: there is a wrapper (the envelope) around your encrypted file that contains the encrypted DEK.

In summary, KMS only provides the data key and its encrypted version. The actual encryption of the large file happens client-side.

Decrypting Envelope Encrypted Data
To decrypt the envelope, we start with the envelope file containing the encrypted DEK and the encrypted file. We call the decrypt API on KMS, passing only the encrypted DEK, which is under the four kilobyte limit.

KMS checks IAM permissions and, if authorized, decrypts the DEK and returns the plain-text DEK. We then use this plain-text DEK client-side to decrypt the large encrypted file, resulting in the original plain-text file.

The purpose of envelope encryption is to leverage KMS for key generation and management, while performing the heavy encryption and decryption client-side.

AWS Encryption SDK
Implementing envelope encryption manually is complex. AWS provides the Encryption SDK to simplify this process. It is available as a CLI tool and SDKs for Java, Python, C, JavaScript, and more.

The Encryption SDK implements the envelope encryption pattern and includes a feature called data key caching. This feature allows reusing data keys instead of generating a new one for every encryption operation.

Data key caching reduces the number of API calls to KMS, lowering costs and improving performance. However, it introduces a security trade-off because the same data encryption key is used for multiple files.

When using data key caching, a LocalCryptoMaterialsCache is used to define cache size parameters such as the maximum age of the key, the maximum number of bytes encrypted, or the maximum number of messages encrypted before rotating to a new data key.

Summary of Important KMS Symmetric APIs for the Exam
Encrypt API: Encrypts data up to four kilobytes using KMS.
GenerateDataKey API: Generates a unique symmetric data key (DEK). Returns both a plain-text and an encrypted copy of the data key using the specified CMK. Used in envelope encryption.
GenerateDataKeyWithoutPlaintext API: Generates an encrypted data key without returning the plain-text version immediately. The plain-text key must be decrypted later before use.
Decrypt API: Decrypts data up to four kilobytes, including decrypting the encrypted DEK in envelope encryption.
GenerateRandom API: Generates a random byte string.
For envelope encryption, use the GenerateDataKey API, not GenerateDataKeyWithoutPlaintext. To decrypt, use the decrypt API to decrypt the data key.

This concludes the lecture on KMS encryption patterns and envelope encryption.

Key Takeaways
The KMS encrypt and decrypt APIs handle secrets up to four kilobytes.
Envelope encryption is used for encrypting data larger than four kilobytes using the GenerateDataKey API.
Envelope encryption involves client-side encryption with a data encryption key (DEK) and storing an encrypted DEK alongside the encrypted data.
AWS provides an Encryption SDK that simplifies envelope encryption and supports data key caching to reduce API calls with a trade-off in security.