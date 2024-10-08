export const osVariants = [
  { name: 'vista', desc: 'Microsoft Windows Vista', type: 'Windows', cls: 'windows-1' },
  { name: 'win10', desc: 'Microsoft Windows 10', type: 'Windows', cls: 'windows-1' },
  { name: 'win2k', desc: 'Microsoft Windows 2000', type: 'Windows', cls: 'windows-1' },
  { name: 'win2k12', desc: 'Microsoft Windows Server 2012', type: 'Windows', cls: 'windows-1' },
  { name: 'win2k16', desc: 'Microsoft Windows Server 2016', type: 'Windows', cls: 'windows-1' },
  { name: 'win2k19', desc: 'Microsoft Windows Server 2019', type: 'Windows', cls: 'windows-1' },
  { name: 'win2k3', desc: 'Microsoft Windows Server 2003', type: 'Windows', cls: 'windows-1' },
  { name: 'win2k8', desc: 'Microsoft Windows Server 2008', type: 'Windows', cls: 'windows-1' },
  { name: 'win7', desc: 'Microsoft Windows 7', type: 'Windows', cls: 'windows-1' },
  { name: 'win8', desc: 'Microsoft Windows 8', type: 'Windows', cls: 'windows-1' },
  { name: 'winxp', desc: 'Microsoft Windows XP', type: 'Windows', cls: 'windows-1' },
  { name: 'winxp64', desc: 'Microsoft Windows XP (x86_64)', type: 'Windows', cls: 'windows-1' },
  { name: 'freebsd10', desc: 'FreeBSD 10.x (or later)', type: 'BSD', cls: 'freebsd' },
  { name: 'freebsd6', desc: 'FreeBSD 6.x', type: 'BSD', cls: 'freebsd' },
  { name: 'freebsd7', desc: 'FreeBSD 7.x', type: 'BSD', cls: 'freebsd' },
  { name: 'freebsd8', desc: 'FreeBSD 8.x', type: 'BSD', cls: 'freebsd' },
  { name: 'freebsd9', desc: 'FreeBSD 9.x', type: 'BSD', cls: 'freebsd' },
  { name: 'openbsd4', desc: 'OpenBSD 4.x (or later)', type: 'BSD', cls: 'freebsd' },
  { name: 'opensolaris', desc: 'Sun OpenSolaris (or later)', type: 'Solaris', cls: 'solaris' },
  { name: 'solaris10', desc: 'Sun Solaris 10', type: 'Solaris', cls: 'solaris' },
  { name: 'solaris11', desc: 'Sun Solaris 11 (or later)', type: 'Solaris', cls: 'solaris' },
  { name: 'solaris9', desc: 'Sun Solaris 9', type: 'Solaris', cls: 'solaris' },
  { name: 'msdos', desc: 'MS-DOS', type: 'Netware', cls: 'opensuse' },
  { name: 'netware4', desc: 'Novell Netware 4', type: 'Netware', cls: 'opensuse' },
  { name: 'netware5', desc: 'Novell Netware 5', type: 'Netware', cls: 'opensuse' },
  { name: 'netware6', desc: 'Novell Netware 6 (or later)', type: 'Netware', cls: 'opensuse' },
  { name: 'altlinux', desc: 'ALT Linux (or later)', type: 'Linux', cls: 'linux-1' },
  { name: 'debianetch', desc: 'Debian Etch', type: 'Linux', cls: 'debian' },
  { name: 'debianlenny', desc: 'Debian Lenny', type: 'Linux', cls: 'debian' },
  { name: 'debiansqueeze', desc: 'Debian Squeeze', type: 'Linux', cls: 'debian' },
  { name: 'debianwheezy', desc: 'Debian Wheezy (or later)', type: 'Linux', cls: 'debian' },
  { name: 'fedora10', desc: 'Fedora 10', type: 'Linux', cls: 'linux-1' },
  { name: 'fedora11', desc: 'Fedora 11', type: 'Linux', cls: 'linux-1' },
  { name: 'fedora12', desc: 'Fedora 12', type: 'Linux', cls: 'linux-1' },
  { name: 'fedora13', desc: 'Fedora 13', type: 'Linux', cls: 'linux-1' },
  { name: 'fedora14', desc: 'Fedora 14', type: 'Linux', cls: 'linux-1' },
  { name: 'fedora15', desc: 'Fedora 15', type: 'Linux', cls: 'linux-1' },
  { name: 'fedora16', desc: 'Fedora 16', type: 'Linux', cls: 'linux-1' },
  { name: 'fedora17', desc: 'Fedora 17', type: 'Linux', cls: 'linux-1' },
  { name: 'fedora18', desc: 'Fedora 18', type: 'Linux', cls: 'linux-1' },
  { name: 'fedora19', desc: 'Fedora 19', type: 'Linux', cls: 'linux-1' },
  { name: 'fedora20', desc: 'Fedora 20 (or later)', type: 'Linux', cls: 'linux-1' },
  { name: 'fedora5', desc: 'Fedora Core 5', type: 'Linux', cls: 'linux-1' },
  { name: 'fedora6', desc: 'Fedora Core 6', type: 'Linux', cls: 'linux-1' },
  { name: 'fedora7', desc: 'Fedora 7', type: 'Linux', cls: 'linux-1' },
  { name: 'fedora8', desc: 'Fedora 8', type: 'Linux', cls: 'linux-1' },
  { name: 'fedora9', desc: 'Fedora 9', type: 'Linux', cls: 'linux-1' },
  { name: 'generic24', desc: 'Generic 2.4.x kernel', type: 'Linux', cls: 'linux-1' },
  { name: 'generic26', desc: 'Generic 2.6.x kernel', type: 'Linux', cls: 'linux-1' },
  { name: 'mageia1', desc: 'Mageia 1 (or later)', type: 'Linux', cls: 'linux-1' },
  { name: 'mandriva2009', desc: 'Mandriva Linux 2009 and earlier', type: 'Linux', cls: 'linux-1' },
  { name: 'mandriva2010', desc: 'Mandriva Linux 2010 (or later)', type: 'Linux', cls: 'linux-1' },
  { name: 'mbs1', desc: 'Mandriva Business Server 1 (or later)', type: 'Linux', cls: 'linux-1' },
  { name: 'mes5', desc: 'Mandriva Enterprise Server 5.0', type: 'Linux', cls: 'linux-1' },
  { name: 'mes5.1', desc: 'Mandriva Enterprise Server 5.1 (or later)', type: 'Linux', cls: 'linux-1' },
  { name: 'opensuse11', desc: 'openSuse 11', type: 'Linux', cls: 'opensuse' },
  { name: 'opensuse12', desc: 'openSuse 12 (or later)', type: 'Linux', cls: 'opensuse' },
  { name: 'rhel2.1', desc: 'Red Hat Enterprise Linux 2.1', type: 'Linux', cls: 'redhat' },
  { name: 'rhel3', desc: 'Red Hat Enterprise Linux 3', type: 'Linux', cls: 'redhat' },
  { name: 'rhel4', desc: 'Red Hat Enterprise Linux 4', type: 'Linux', cls: 'redhat' },
  { name: 'rhel5', desc: 'Red Hat Enterprise Linux 5', type: 'Linux', cls: 'redhat' },
  { name: 'rhel5.4', desc: 'Red Hat Enterprise Linux 5.4 or later', type: 'Linux', cls: 'redhat' },
  { name: 'rhel6', desc: 'Red Hat Enterprise Linux 6', type: 'Linux', cls: 'redhat' },
  { name: 'rhel7', desc: 'Red Hat Enterprise Linux 7 (or later)', type: 'Linux', cls: 'redhat' },
  { name: 'sles10', desc: 'Suse Linux Enterprise Server', type: 'Linux', cls: 'opensuse' },
  { name: 'sles11', desc: 'Suse Linux Enterprise Server 11 (or later)', type: 'Linux', cls: 'opensuse' },
  { name: 'ubuntuhardy', desc: 'Ubuntu 8.04 LTS (Hardy Heron)', type: 'Linux', cls: 'ubuntu' },
  { name: 'ubuntuintrepid', desc: 'Ubuntu 8.10 (Intrepid Ibex)', type: 'Linux', cls: 'ubuntu' },
  { name: 'ubuntujaunty', desc: 'Ubuntu 9.04 (Jaunty Jackalope)', type: 'Linux', cls: 'ubuntu' },
  { name: 'ubuntukarmic', desc: 'Ubuntu 9.10 (Karmic Koala)', type: 'Linux', cls: 'ubuntu' },
  { name: 'ubuntulucid', desc: 'Ubuntu 10.04 LTS (Lucid Lynx)', type: 'Linux', cls: 'ubuntu' },
  { name: 'ubuntumaverick', desc: 'Ubuntu 10.10 (Maverick Meerkat)', type: 'Linux', cls: 'ubuntu' },
  { name: 'ubuntunatty', desc: 'Ubuntu 11.04 (Natty Narwhal)', type: 'Linux', cls: 'ubuntu' },
  { name: 'ubuntuoneiric', desc: 'Ubuntu 11.10 (Oneiric Ocelot)', type: 'Linux', cls: 'ubuntu' },
  { name: 'ubuntuprecise', desc: 'Ubuntu 12.04 LTS (Precise Pangolin)', type: 'Linux', cls: 'ubuntu' },
  { name: 'ubuntuquantal', desc: 'Ubuntu 12.10 (Quantal Quetzal)', type: 'Linux', cls: 'ubuntu' },
  { name: 'ubunturaring', desc: 'Ubuntu 13.04 (Raring Ringtail)', type: 'Linux', cls: 'ubuntu' },
  { name: 'ubuntusaucy', desc: 'Ubuntu 13.10 (Saucy Salamander) (or later)', type: 'Linux', cls: 'ubuntu' },
  { name: 'virtio26', desc: 'Generic 2.6.25 or later kernel with virtio', type: 'Linux', cls: 'linux-1' },
]

export const osTypes = [
  { name: 'Windows', cls: 'windows-1' },
  { name: 'BSD', cls: 'freebsd' },
  { name: 'Solaris', cls: 'solaris' },
  { name: 'Netware', cls: 'opensuse' },
  { name: 'Linux', cls: 'linux-1' },
]
