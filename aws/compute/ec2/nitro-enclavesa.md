AWS Nitro Enclaves

• Process highly sensitive data in an isolated compute environment
• Personally Identifiable Information (PII), healthcare, financial, …
• Fully isolated virtual machines, hardened, and highly constrained
• Not a container, not persistent storage, no interactive access, no external networking
• Helps reduce the attack surface for sensitive data processing apps
• Cryptographic Attestation – only authorized code can be running in your Enclave
• Only Enclaves can access sensitive data (integration with KMS)
• Use cases: securing private keys, processing credit cards, secure multi-party
computation…

---

AWS Nitro Enclaves
Introduction to Nitro Enclaves
The concept of Nitro Enclaves addresses the need to process highly sensitive data in the cloud within an isolated compute environment. This sensitive data may include personally identifiable information (PII), healthcare data, financial data, credit card information, or other confidential material.

Historically, creating such an isolated compute environment involved setting up a new Virtual Private Cloud (VPC), restricting access and networking, which was cumbersome and complex. Nitro Enclaves offer a streamlined alternative.

What Are Nitro Enclaves?
Nitro Enclaves are virtual machines that are highly isolated, hardened, and constrained. They differ from containers in that they do not have persistent storage, lack interactive access, and cannot be accessed via SSH. Furthermore, they have no external networking capabilities, making them extremely contained environments.

The purpose of Nitro Enclaves is to provide a secure environment where sensitive data processing can occur, significantly reducing the attack surface for applications handling such data.

Security Features of Nitro Enclaves
Nitro Enclaves utilize Cryptographic Attestation to ensure that only authorized, signed code can run within the Enclave. This means that the code must be signed before deployment, and only that signed code is permitted execution inside the Enclave.

Additionally, AWS Key Management Service (KMS) encryption guarantees that only the Enclave has access to the sensitive data it processes, further enhancing security.

Use Cases for Nitro Enclaves
Typical use cases include private key processing, credit card data handling, secure multi-party computation, and other scenarios requiring the highest level of security on EC2 instances.

How Nitro Enclaves Work
To use Nitro Enclaves, you launch a compatible Nitro-based EC2 instance and enable the 'EnclaveOptions' by setting it to 'true'. This allows you to launch a Nitro Enclave from within the EC2 instance.

Using the Nitro CLI, you convert your application into an Enclave Image File (EIF). This EIF is then used as input to create the Enclave on your EC2 instance. The Enclave shares the virtual private cloud (VPC), memory, CPU, and kernel with the host but remains highly isolated internally.

The EC2 hosts run on the Nitro Hypervisor, which is the foundation for Nitro Enclaves. The EC2 instance and the Enclave maintain separation but communicate over a secure local channel. This setup ensures that the Enclave remains secure and isolated from other instances running on the same host.

Summary
In summary, Nitro Enclaves provide a highly secure, isolated environment for processing sensitive data on AWS EC2 instances. They leverage the Nitro Hypervisor technology and enforce strict security measures such as cryptographic attestation and KMS encryption to protect data and code integrity.

Key Takeaways
Nitro Enclaves provide an isolated compute environment for processing highly sensitive data such as PII, healthcare, and financial information.
They are virtual machines that are hardened, highly constrained, lack persistent storage, interactive access, and external networking.
Only authorized, signed code can run inside the Enclave, and KMS encryption ensures that only the Enclave can access sensitive data.
Nitro Enclaves are launched on compatible Nitro-based EC2 instances and communicate securely with the host instance over a local channel.